import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { supabase } from '../lib/supabase';
import { IonButton, IonImg } from '@ionic/react';

export function AvatarUpload() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const uploadAvatar = async () => {
    try {
      // 1. Tomar foto con Capacitor
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
      });

      if (!photo.webPath) return;

      // 2. Convertir webPath a Blob
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      // 3. Definir ruta única: userId/timestamp.jpeg
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No hay usuario autenticado');

      const filePath = `${user.id}/${Date.now()}.jpeg`;

      // 4. Subir a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true });

      if (uploadError) throw uploadError;

      // 5. Obtener URL pública
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
    } catch (error) {
      console.error('Error al subir avatar:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <IonButton onClick={uploadAvatar}>Cambiar Avatar</IonButton>
      {avatarUrl && (
        <IonImg
          src={avatarUrl}
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '12px' }}
        />
      )}
    </div>
  );
}