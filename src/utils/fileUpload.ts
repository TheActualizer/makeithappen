import { supabase } from "@/integrations/supabase/client";

export const uploadChatAttachment = async (file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('chat-attachments')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('chat-attachments')
      .getPublicUrl(fileName);

    return {
      url: publicUrl,
      fileName: file.name,
      fileType: file.type,
    };
  } catch (error) {
    console.error('Error in uploadChatAttachment:', error);
    throw error;
  }
};