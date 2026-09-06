export const CLOUDINARY_CLOUD_NAME = 'kp9uqupk'
export const CLOUDINARY_UPLOAD_PRESET = 'barberia_unsigned'
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`

export async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('folder', 'barberia')

  const res = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Error al subir el archivo')
  }

  const data = await res.json()
  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type, // image | video
    format: data.format,
  }
}
