const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function carregarCulturas() {
    try {
        const response = await fetch(`${url_base}/cultura`, {
            method: 'GET',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
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
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        return null;
    }
}

export async function carregaCulturaPorId(idCultura) {
    try {
        const response = await fetch(`${url_base}/cultura?id=eq.${idCultura}`, {
            method: 'GET',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
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
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        return null;
    }
}



export async function cadastrarCultura(dadosCultura) {
    console.log('Enviando dados para cadastro:', dadosCultura); // Log para debug
    try {
        const response = await fetch(`${url_base}/cultura`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCultura) // Envia os dados no corpo da requisição
        });

        const contentType = response.headers.get('content-type');
        const data = contentType && contentType.includes('application/json')
            ? await response.json() // Converte a resposta para JSON
            : await response.text(); // Caso contrário, pega como texto

        if (response.ok) {
            console.log('Cultura cadastrada com sucesso:', data);
            sessionStorage.setItem('modalMessage', 'Cultura cadastrada com sucesso!');
            window.location.reload(); // Atualiza a página após sucesso
            return data;
        } else {
            console.error('Erro ao cadastrar a cultura:', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar a cultura:', error);
        return null;
    }
}


export async function atualizarCultura(idCultura, dadosCultura) {
    console.log(dadosCultura)
    try {
        const response = await fetch(`${url_base}/cultura?id=eq.${idCultura}`, {
            method: 'PUT',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCultura)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Cultura atualizada com sucesso!');
            window.location.reload()
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao atualizar a cultura:', error);
        return null;
    }
}


export async function deletarCultura(idCultura) {
    try {
        const response = await fetch(`${url_base}/cultura?id=eq.${idCultura}`, {
            method: 'DELETE',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            console.log('Cultura deletada com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Cultura excluída com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao deletar a cultura', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao deletar a cultura:', error);
        return null;
    }
}
