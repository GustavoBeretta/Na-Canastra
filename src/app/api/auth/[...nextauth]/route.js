import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import connectMongoDB from "../../../../lib/db"

// função para achar um usuário no banco de dados que corresponda com o email digitado
async function findUser(email) {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
    const usuarios = await response.json();
    const user = await usuarios.users.find((usuario) => usuario.email === email);
    return user;
}

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            // função de validação das credenciais digitadas
            async authorize(credentials) {
                const { email, password } = credentials

                try {
                    await connectMongoDB()
                    const user = await findUser(email)

                    // se nào for encontrado nenhum usuário com o email digitado, o retorno será 'null', o que resultará em um erro
                    if (!user) {
                        throw new Error("E-mail não cadastrado")
                    }
                    
                    if (password != user.password) {
                        throw new Error("Senha incorreta")
                    }

                    return user
                } catch (error) {
                    console.log(error)
                    return null
                }
            },
        }),
    ],
    callbacks: {

        // atualiza o JWT para fornecer todas as informações do usuário, pois, por padrão, ele fornece apenas nome e email
        async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
        // atualiza a sessão com as informações do JWT
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
    },
    session: {
        // define a estratégia de sessão com JWT
        strategy: "jwt",
    },
    // chave secreta para assinar os JWT
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        // rota da página de login
        signIn: "/login",
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }