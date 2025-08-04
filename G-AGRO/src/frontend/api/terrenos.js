const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function carregarTerrenos() {
    try {
        const response = await fetch(`${url_base}/terreno`, {
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
        console.error('Erro ao carregar os terreno:', error);
        return null;
    }
}

export async function carregaTerrenoPorId(idTerreno) {
    try {
        const response = await fetch(`${url_base}/terreno?id=eq.${idTerreno}`, {
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
            console.log(`Terreno com id:${idTerreno} carregado com sucesso`, data);
            return data;
        } else {
            console.error(`Erro ao carregar o terreno com id:${idTerreno}`, data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error(`Erro ao carregar o terreno com id:${idTerreno}:`, error);
        return null;
    }
}


export async function cadastrarTerreno(dadosTerreno) {
    console.log('Enviando dados para cadastro de terreno:', dadosTerreno); // Log para debug
    try {
        const response = await fetch(`${url_base}/terreno`, { // Ajuste no endpoint se necessário
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosTerreno) // Envia os dados no corpo da requisição
        });

        const contentType = response.headers.get('content-type');
        const data = contentType && contentType.includes('application/json')
            ? await response.json() // Converte a resposta para JSON
            : await response.text(); // Caso contrário, pega como texto

        if (response.ok) {
            console.log('Terreno cadastrado com sucesso:', data);
            sessionStorage.setItem('modalMessage', 'Terreno cadastrado com sucesso!');
            window.location.reload(); // Atualiza a página após sucesso
            return data;
        } else {
            console.error('Erro ao cadastrar o terreno:', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar o terreno:', error);
        return null;
    }
}



export async function atualizarTerrenos(idTerreno, dadosTerreno) {
    try {
        const response = await fetch(`${url_base}/terreno?id=eq.${idTerreno}`, {
            method: 'PUT',
            headers: {
               "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosTerreno)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            console.log('Terreno atualizado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Terreno atualizado com sucesso!');
            window.location.reload(); 
            return data;
        } else {
            console.error('Erro ao atualizar o terreno', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao atualizar o terreno:', error);
        return null;
    }
}



export async function deletarTerreno(idTerreno) {
    try {
        const response = await fetch(`${url_base}/terreno?id=eq.${idTerreno}`, {
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
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            console.log('Terreno deletado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Terreno excluído com sucesso!');
            window.location.reload();
            return data;
        } else {
            console.error('Erro ao deletar o terreno', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao deletar o terreno:', error);
        return null;
    }
}


