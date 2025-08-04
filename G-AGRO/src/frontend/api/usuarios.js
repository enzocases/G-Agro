const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function createUser(dadosUsuario) {
    try {
        console.log(dadosUsuario)
        const response = await fetch(`${url_base}/usuario/cadastro`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUsuario)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Tenta converter para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            console.log('Usuário cadastrado:', data);
            sessionStorage.setItem('modalMessage', 'Usuário cadastrado com sucesso!');
            return data; 
        }else{
            console.error('Erro no cadastro:', data);
            throw new Error(data + response.status);
        }
        
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return null;
    }
}

export async function loginUser(dadosUsuario){
    
    try {
        const response = await fetch(`${url_base}/usuario/login`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUsuario)
        });

        const data = await response.text();
    
        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Login realizado com sucesso!')
            return data
        } else {
            console.log('Usuário não encontrado');
            return null;
        }
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        return null;
    }
}

export async function updateUser(id, usuarioAtualizado) {
    return fetch(`${url_base}/usuario/${id}`, {
        method: 'PUT',
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioAtualizado)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { 
                throw new Error(text); // Lidar com erros
            });
        }
        return response.json(); // Retorna os dados do usuário atualizado
    })
    .catch(error => {
        console.error('Erro ao atualizar usuário:', error);
        throw error; // Repassa o erro para ser tratado no componente
    });
}
