import { supabase } from './config';

// Basit cache mekanizması
const progressCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 dakika

// Kullanıcı ilerlemesini getir
export const getUserProgress = async (userId) => {
  // Cache kontrolü
  const cached = progressCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user progress:', error);
    return null;
  }

  // Cache'e kaydet
  if (data) {
    progressCache.set(userId, { data, timestamp: Date.now() });
  }

  return data;
};

// Kullanıcı ilerlemesini oluştur veya güncelle
export const upsertUserProgress = async (userId, progressData) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        ...progressData,
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting user progress:', error);
      return null;
    }

    // Cache'i güncelle
    progressCache.set(userId, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error('Unexpected error in upsertUserProgress:', error);
    return null;
  }
};

// Günlük ilerlemeyi getir
export const getDailyProgress = async (userId, date) => {
  const { data, error } = await supabase
    .from('daily_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching daily progress:', error);
    return null;
  }

  return data;
};

// Günlük ilerlemeyi oluştur veya güncelle
export const upsertDailyProgress = async (userId, date, progressData) => {
  try {
    const { data, error } = await supabase
      .from('daily_progress')
      .upsert({
        user_id: userId,
        date,
        ...progressData
      }, { onConflict: 'user_id,date' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting daily progress:', error);
      return null;
    }

    // User progress cache'ini geçersiz kıl
    progressCache.delete(userId);

    return data;
  } catch (error) {
    console.error('Unexpected error in upsertDailyProgress:', error);
    return null;
  }
};

// Rozetleri getir
export const getUserBadges = async (userId) => {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  return data;
};

// Rozet ekle
export const addBadge = async (userId, badgeId) => {
  const { data, error } = await supabase
    .from('badges')
    .insert({
      user_id: userId,
      badge_id
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding badge:', error);
    return null;
  }

  return data;
};

// Hikaye okundu olarak işaretle
export const markStoryAsRead = async (userId, storyId) => {
  try {
    const progress = await getUserProgress(userId);

    // Hikaye zaten okunmuş mu kontrol et
    if (progress?.completed_stories?.includes(storyId)) {
      return true;
    }

    // Hikayeyi ekle (satır yoksa oluşturur, varsa günceller)
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        completed_stories: [...(progress?.completed_stories || []), storyId],
        quiz_results: progress?.quiz_results || [],
        learned_words: progress?.learned_words || [],
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) throw error;

    // Günlük ilerlemeyi güncelle
    const today = new Date().toISOString().split('T')[0];
    await upsertDailyProgress(userId, today, {
      stories_read: 1,
      quizzes_completed: 0,
      words_learned: 0
    });

    // Cache'i güncelle
    progressCache.delete(userId);

    return true;
  } catch (error) {
    console.error('Hikaye işaretlenirken hata:', error);
    return false;
  }
};

// Kelime öğrenildi olarak işaretle
export const markWordAsLearned = async (userId, word) => {
  try {
    const progress = await getUserProgress(userId);

    if (progress?.learned_words?.includes(word)) {
      return true;
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        completed_stories: progress?.completed_stories || [],
        quiz_results: progress?.quiz_results || [],
        learned_words: [...(progress?.learned_words || []), word],
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) throw error;

    // Günlük ilerlemeyi güncelle
    const today = new Date().toISOString().split('T')[0];
    await upsertDailyProgress(userId, today, {
      stories_read: 0,
      quizzes_completed: 0,
      words_learned: 1
    });

    // Cache'i güncelle
    progressCache.delete(userId);

    return true;
  } catch (error) {
    console.error('Kelime işaretlenirken hata:', error);
    return false;
  }
};

// Quiz sonucunu kaydet
export const saveQuizResult = async (userId, quizResult) => {
  try {
    const progress = await getUserProgress(userId);

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        completed_stories: progress?.completed_stories || [],
        quiz_results: [...(progress?.quiz_results || []), quizResult],
        learned_words: progress?.learned_words || [],
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) throw error;

    // Günlük ilerlemeyi güncelle
    const today = new Date().toISOString().split('T')[0];
    await upsertDailyProgress(userId, today, {
      stories_read: 0,
      quizzes_completed: 1,
      words_learned: 0
    });

    // Cache'i güncelle
    progressCache.delete(userId);

    return true;
  } catch (error) {
    console.error('Quiz sonucu kaydedilirken hata:', error);
    return false;
  }
};
