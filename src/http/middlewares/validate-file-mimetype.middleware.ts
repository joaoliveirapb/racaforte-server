import type { MultipartFile } from '@fastify/multipart'
import type { FastifyReply, FastifyRequest } from 'fastify'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function validateFileMimetype(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // console.log(
  //   '[Middleware Validate File Mimetype]: Iniciando validação dos arquivos...'
  // )
  const files = request.files()
  const uploadedFiles: MultipartFile[] = []

  for await (const file of files) {
    const mimetype = file.mimetype

    if (!ALLOWED_MIMETYPES.includes(mimetype)) {
      return reply.status(400).send({
        error: `Tipo de arquivo inválido: ${mimetype}. Somente arquivos do tipo: ${ALLOWED_MIMETYPES.join(', ')}, são permitidos.`,
      })
    }

    uploadedFiles.push(file)
  }

  request.files = async function* () {
    for (const file of uploadedFiles) {
      yield file
    }
  }
}
