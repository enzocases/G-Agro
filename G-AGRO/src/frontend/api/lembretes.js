const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function carregarLembretes() {
    try {
        const response = await fetch(`${url_base}/lembrete`, {
            method: 'GET',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            return data;
        } else {
            console.error('Erro ao carregar os lembrete', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao carregar os lembrete:', error);
        return null;
    }

}

export async function carregaLembretePorId(idLembrete) {
    try {
        const response = await fetch(`${url_base}/lembrete?id=eq.${idLembrete}`, {
            method: 'GET',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            return data;
        } else {
            console.error(`Erro ao carregar o lembrete com id: ${idLembrete}`, data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error(`Erro ao carregar o lembrete com id: ${idLembrete}:`, error);
        return null;
    }

}

export async function cadastrarLembrete(dadosLembrete) {
    try {
        const response = await fetch(`${url_base}/lembrete`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosLembrete),
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }
        
        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Lembrete cadastrado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao cadastrar o lembrete', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar o lembrete:', error);
        return null;
    }

}


export async function atualizarLembrete(idLembrete, dadosLembrete) {
    try {
        const response = await fetch(`${url_base}/lembrete?id=eq.${idLembrete}`, {
            method: 'PATCH', 
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosLembrete),
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Lembrete atualizado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao atualizar o lembrete', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao atualizar o lembrete:', error);
        return null;
    }

}


export async function deletarLembrete(idLembrete) {
    try {
        const response = await fetch(`${url_base}/lembrete?id=eq.${idLembrete}`, {
            method: 'DELETE',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Lembrete excluído com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao deletar o lembrete', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao deletar o lembrete:', error);
        return null;
    }

}