const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";


export async function cadastrarPlantio(dadosPlantio) {
    console.log('Enviando dados para cadastro de plantio:', dadosPlantio); // Log para depuração
    try {
        const response = await fetch(`${url_base}/plantio`, { // Certifique-se de que a barra "/" está no lugar certo
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPlantio) // Dados enviados no corpo da requisição
        });

        // Verifique o tipo de conteúdo na resposta
        const contentType = response.headers.get('content-type');
        const data = contentType && contentType.includes('application/json')
            ? await response.json() // Converte para JSON
            : await response.text(); // Caso contrário, pega o texto da resposta

        // Verifica se a resposta é bem-sucedida
        if (response.ok) {
            console.log('Plantio cadastrado com sucesso:', data);
            sessionStorage.setItem('modalMessage', 'Plantio cadastrado com sucesso!');
            return data; // Retorna os dados
        } else {
            console.error('Erro ao cadastrar o plantio:', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar o plantio:', error);
        return null; // Retorna null em caso de erro
    }
}


export async function carregarPlantios() {
    try {
        const response = await fetch(`${url_base}/plantio?select=*,cultura(*),terreno(*)`, {
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
            return data; // Retorna os dados completos
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao carregar plantios:', error);
        return null;
    }
}

export async function atualizarPlantios(idPlantio, dadosPlantio) {
    try {
        const response = await fetch(`${url_base}/plantio?id=eq.${idPlantio}`, {
            method: 'PUT',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPlantio)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        console.log(data)
        
        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Plantio atualizado com sucesso!');
            window.location.reload()
            return data;
        } 
    } catch (error) {
        return null;
    }
        

}

export async function deletarPlantio(idPlantio) {
    try {
        const response = await fetch(`${url_base}/plantio?id=eq.${idPlantio}`, {
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

        console.log(data)
        console.log(response)
        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Plantio excluído com sucesso!');
            window.location.reload()
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        return null;
    }
}

