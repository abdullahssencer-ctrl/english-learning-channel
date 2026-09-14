import { supabase } from './config';

// Get the user's last read story and scroll position
export async function getUserLastStory(userId) {
  const { data, error } = await supabase
    .from('user_last_story')
    .select('story_id, last_scroll_position')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') console.error('Error fetching last story:', error);
  return data;
}

// Insert or update the last story record for a user
export async function upsertUserLastStory(userId, storyId, scrollPos) {
  const { data, error } = await supabase
    .from('user_last_story')
    .upsert(
      {
        user_id: userId,
        story_id: storyId,
        last_scroll_position: scrollPos,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) console.error('Error upserting last story:', error);
  return data;
}
