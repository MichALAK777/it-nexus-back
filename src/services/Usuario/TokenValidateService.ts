const jwt = require('jsonwebtoken');

interface TokenRequest {
  token: string;
}

class TokenValidateService {
  async execute({ token }: TokenRequest) {
    if (!token) throw new Error('Token não fornecido!');

    try {
      // Verifica a assinatura do token usando a chave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Se o token for válido, retorne o payload decodificado
      return {
        message: 'Token válido!',
        id: decoded.sub,
        login: decoded.login,
      };
    } catch (error) {
      throw new Error('Token inválido ou expirado!');
      // return {
      //   message: '',
      //   error: error.message,
      // };
    }
  }
}

export { TokenValidateService };
