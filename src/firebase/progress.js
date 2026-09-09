import { db } from './config';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from 'firebase/firestore';

// Kullanıcı ilerleme verilerini kaydetme
export async function saveProgress(userId, storyId, storyData) {
  try {
    const userProgressRef = doc(db, 'users', userId, 'progress', 'stories');
    const docSnap = await getDoc(userProgressRef);

    if (docSnap.exists()) {
      await updateDoc(userProgressRef, {
        completedStories: arrayUnion(storyId),
        lastUpdated: new Date().toISOString()
      });
    } else {
      await setDoc(userProgressRef, {
        completedStories: [storyId],
        lastUpdated: new Date().toISOString()
      });
    }

    // Her hikaye için detaylı ilerleme
    const storyProgressRef = doc(db, 'users', userId, 'storyProgress', storyId.toString());
    await setDoc(storyProgressRef, {
      ...storyData,
      completedAt: new Date().toISOString()
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('İlerleme kaydedilirken hata:', error);
    return false;
  }
}

// Sınav sonucunu kaydetme
export async function saveQuizResult(userId, quizId, result) {
  try {
    const quizProgressRef = doc(db, 'users', userId, 'quizProgress', quizId);
    await setDoc(quizProgressRef, {
      ...result,
      completedAt: new Date().toISOString()
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('Sınav sonucu kaydedilirken hata:', error);
    return false;
  }
}

// Kullanıcı ilerlemesini getirme
export async function getUserProgress(userId) {
  try {
    const userProgressRef = doc(db, 'users', userId, 'progress', 'stories');
    const docSnap = await getDoc(userProgressRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return { completedStories: [], lastUpdated: null };
  } catch (error) {
    console.error('İlerleme getirilirken hata:', error);
    return { completedStories: [], lastUpdated: null };
  }
}

// Kullanıcı sınav sonuçlarını getirme
export async function getUserQuizResults(userId) {
  try {
    const quizProgressRef = collection(db, 'users', userId, 'quizProgress');
    const querySnapshot = await getDocs(quizProgressRef);
    
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (error) {
    console.error('Sınav sonuçları getirilirken hata:', error);
    return [];
  }
}

// Kullanıcı istatistiklerini getirme
export async function getUserStats(userId) {
  try {
    const progress = await getUserProgress(userId);
    const quizResults = await getUserQuizResults(userId);

    const totalStories = progress.completedStories?.length || 0;
    const totalQuizzes = quizResults.length;
    const averageQuizScore = quizResults.length > 0 
      ? Math.round(quizResults.reduce((sum, q) => sum + q.score, 0) / quizResults.length)
      : 0;

    return {
      totalStories,
      totalQuizzes,
      averageQuizScore,
      lastUpdated: progress.lastUpdated
    };
  } catch (error) {
    console.error('İstatistikler getirilirken hata:', error);
    return {
      totalStories: 0,
      totalQuizzes: 0,
      averageQuizScore: 0,
      lastUpdated: null
    };
  }
}
