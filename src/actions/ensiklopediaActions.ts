'use server';

import EnsiklopediaService from '../services/EnsiklopediaService';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Ambil token dari cookie dengan aman
async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized: Token not found in cookies.');
  }

  return token;
}

// CREATE
// CREATE
export async function createEnsiklopedia(formData: FormData) {
  const token = await getToken();

  const photoFile = formData.get('photo') as File | null;
  const audioFile = formData.get('audio') as File | null;

  console.log('=== DEBUG FILE INFO ===');
  console.log('Photo:', {
    name: photoFile?.name,
    size: photoFile?.size,
    type: photoFile?.type,
    isFile: photoFile instanceof File
  });
  console.log('Audio:', {
    name: audioFile?.name,
    size: audioFile?.size,
    type: audioFile?.type,
    isFile: audioFile instanceof File
  });

  // Buat FormData baru untuk backend
  const backendFormData = new FormData();
  
  backendFormData.append('name', formData.get('name') as string);
  backendFormData.append('description', formData.get('description') as string);
  backendFormData.append('category', formData.get('category') as string);
  backendFormData.append('location', formData.get('location') as string);
  backendFormData.append('status', formData.get('status') as string);

  // PENTING: Pastikan file benar-benar ada sebelum append
  if (photoFile && photoFile.size > 0 && photoFile instanceof File) {
    console.log('✅ Appending photo file to FormData');
    backendFormData.append('photo', photoFile);
  } else {
    console.log('❌ Photo file NOT appended');
  }
  
  if (audioFile && audioFile.size > 0 && audioFile instanceof File) {
    console.log('✅ Appending audio file to FormData');
    backendFormData.append('audio', audioFile);
  } else {
    console.log('❌ Audio file NOT appended');
  }

  // Log isi FormData
  console.log('=== FormData Contents ===');
  for (let [key, value] of backendFormData.entries()) {
    if (value instanceof File) {
      console.log(key, '→ File:', value.name, value.size, 'bytes');
    } else {
      console.log(key, '→', value);
    }
  }

  try {
    await EnsiklopediaService.createEnsiklopediaWithFormData(backendFormData, token);
    console.log('✅ Create successful');
  } catch (error) {
    console.error('❌ Create Error:', error);
    throw new Error('Failed to create ensiklopedia.');
  }

  revalidatePath('/admin/data');
}

// UPDATE
export async function updateEnsiklopedia(id: string, formData: FormData) {
  const token = await getToken();

  const photoFile = formData.get('photo') as File | null;
  const audioFile = formData.get('audio') as File | null;

  // Buat FormData baru untuk backend
  const backendFormData = new FormData();
  
  backendFormData.append('name', formData.get('name') as string);
  backendFormData.append('description', formData.get('description') as string);
  backendFormData.append('category', formData.get('category') as string);
  backendFormData.append('location', formData.get('location') as string);
  backendFormData.append('status', formData.get('status') as string);

  if (photoFile && photoFile.size > 0) {
    backendFormData.append('photo', photoFile);
  }

  if (audioFile && audioFile.size > 0) {
    backendFormData.append('audio', audioFile);
  }

  try {
    await EnsiklopediaService.updateEnsiklopediaWithFormData(id, backendFormData, token);
  } catch (error) {
    console.error('Update Error:', error);
    throw new Error('Failed to update ensiklopedia.');
  }

  revalidatePath('/admin/data');
}

// DELETE
export async function deleteEnsiklopedia(id: string) {
  const token = await getToken();

  try {
    await EnsiklopediaService.deleteEnsiklopedia(id, token);
  } catch (error) {
    console.error('Delete Error:', error);
    throw new Error('Failed to delete ensiklopedia.');
  }

  revalidatePath('/admin/data');
}