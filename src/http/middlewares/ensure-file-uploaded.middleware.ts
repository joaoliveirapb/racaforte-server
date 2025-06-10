import type { MultipartFile } from '@fastify/multipart'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function ensureFileUploaded(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // console.log(
  //   '[Middleware Ensure File Uploaded]: Iniciando validação dos arquivos...'
  // )
  const files = request.files()
  const uploadedFiles: MultipartFile[] = []

  for await (const file of files) {
    const filename = file.filename

    if (!filename) {
      return reply.status(400).send({ error: 'Nenhum arquivo enviado.' })
    }

    uploadedFiles.push(file)
  }

  request.files = async function* () {
    for (const file of uploadedFiles) {
      yield file
    }
  }
}
