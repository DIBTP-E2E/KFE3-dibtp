import { API_ROUTES } from '@web/constants';
import { deleteImages } from '@web/services/images/client/deleteImages';
import { uploadImages } from '@web/services/images/client/uploadImages';


import type { UploadedImage } from '@web/types';

interface UpdateProfileArgs {
  nickname?: string;
  profileImage?: File | null;
  isImageDeleted?: boolean;
  currentProfileImageUrl?: string | null;
}

export const updateProfile = async ({
  nickname,
  profileImage,
  isImageDeleted,
  currentProfileImageUrl,
}: UpdateProfileArgs) => {
  let finalProfileImageUrl: string | null | undefined = currentProfileImageUrl;

  try {
    // 1. 이미지 삭제 로직 (isImageDeleted가 true인 경우)
    if (isImageDeleted) {
      if (currentProfileImageUrl) {
        // 기존 이미지가 있다면 삭제
        await deleteImages([{ url: currentProfileImageUrl }], 'profile');
      }
      finalProfileImageUrl = null;
    }

    // 2. 새 이미지 업로드 로직 (profileImage가 File 객체인 경우)
    if (profileImage instanceof File) {
      if (currentProfileImageUrl && !isImageDeleted) {
        await deleteImages([{ url: currentProfileImageUrl }], 'profile');
      }

      const uploadedImages = await uploadImages([profileImage], 'profile');
      console.log('Attempting to upload profile image:', profileImage);
      console.log('Attempting to upload profile image:', profileImage);
      if (uploadedImages.length === 0) {
        throw new Error('프로필 이미지 업로드에 실패했습니다.');
      }
      finalProfileImageUrl = (uploadedImages[0] as UploadedImage).url;
    }

    // 닉네임과 최종 이미지 URL을 API 라우트로 전송
    const response = await fetch(API_ROUTES.MY_INFO, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickname !== undefined ? nickname : null,
        profileImageUrl: finalProfileImageUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '프로필 업데이트에 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('클라이언트 프로필 업데이트 오류:', error);
    throw error;
  }
};
