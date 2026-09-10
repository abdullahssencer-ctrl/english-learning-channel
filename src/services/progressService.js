import { supabase } from '../supabase/config';

// Kullanıcı ilerlemesini getir
export async function getUserProgress(userId) {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Kayıt yoksa oluştur
        return await createUserProgress(userId);
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('İlerleme getirilirken hata:', error);
    return null;
  }
}

// Yeni kullanıcı ilerlemesi oluştur
export async function createUserProgress(userId) {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .insert([
        {
          user_id: userId,
          completed_stories: [],
          quiz_results: [],
          learned_words: []
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('İlerleme oluşturulurken hata:', error);
    return null;
  }
}

// Hikaye okundu olarak işaretle
export async function markStoryAsRead(userId, storyId) {
  try {
    // Önce mevcut ilerlemeyi getir
    const progress = await getUserProgress(userId);
    if (!progress) return false;

    // Hikaye zaten okunmuş mu kontrol et
    if (progress.completed_stories.includes(storyId)) {
      return true; // Zaten okunmuş
    }

    // Hikayeyi ekle
    const { error } = await supabase
      .from('user_progress')
      .update({
        completed_stories: [...progress.completed_stories, storyId],
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;

    // Günlük ilerlemeyi de güncelle
    await updateDailyProgress(userId, 'stories_read', 1);

    return true;
  } catch (error) {
    console.error('Hikaye işaretlenirken hata:', error);
    return false;
  }
}

// Quiz sonucunu kaydet
export async function saveQuizResult(userId, quizResult) {
  try {
    const progress = await getUserProgress(userId);
    if (!progress) return false;

    const { error } = await supabase
      .from('user_progress')
      .update({
        quiz_results: [...progress.quiz_results, quizResult],
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;

    // Günlük ilerlemeyi güncelle
    await updateDailyProgress(userId, 'quizzes_completed', 1);

    return true;
  } catch (error) {
    console.error('Quiz sonucu kaydedilirken hata:', error);
    return false;
  }
}

// Kelime öğrenildi olarak işaretle
export async function markWordAsLearned(userId, word) {
  try {
    const progress = await getUserProgress(userId);
    if (!progress) return false;

    if (progress.learned_words.includes(word)) {
      return true; // Zaten öğrenilmiş
    }

    const { error } = await supabase
      .from('user_progress')
      .update({
        learned_words: [...progress.learned_words, word],
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;

    // Günlük ilerlemeyi güncelle
    await updateDailyProgress(userId, 'words_learned', 1);

    return true;
  } catch (error) {
    console.error('Kelime işaretlenirken hata:', error);
    return false;
  }
}

// Günlük ilerlemeyi güncelle
async function updateDailyProgress(userId, field, increment) {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Önce bugünün kaydını kontrol et
    const { data: existing } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (existing) {
      // Var olan kaydı güncelle
      const { error } = await supabase
        .from('daily_progress')
        .update({
          [field]: existing[field] + increment
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Yeni kayıt oluştur
      const { error } = await supabase
        .from('daily_progress')
        .insert([
          {
            user_id: userId,
            date: today,
            [field]: increment
          }
        ]);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Günlük ilerleme güncellenirken hata:', error);
  }
}

// Günlük ilerlemeyi getir
export async function getDailyProgress(userId, days = 7) {
  try {
    const { data, error } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(days);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Günlük ilerleme getirilirken hata:', error);
    return [];
  }
}

// Rozet ekle
export async function addBadge(userId, badgeId) {
  try {
    const { error } = await supabase
      .from('badges')
      .insert([
        {
          user_id: userId,
          badge_id: badgeId
        }
      ]);

    if (error) {
      if (error.code === '23505') {
        // Rozet zaten var
        return true;
      }
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Rozet eklenirken hata:', error);
    return false;
  }
}

// Kullanıcı rozetlerini getir
export async function getUserBadges(userId) {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Rozetler getirilirken hata:', error);
    return [];
  }
}
