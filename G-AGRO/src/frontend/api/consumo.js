const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function carregarConsumos() {
    try {
        const response = await fetch(`${url_base}/consumo_produto?select=*,produto(*)`, {
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
        console.error('Erro ao carregar os consumos de produtos:', error);
        return null;
    }
}


export async function carregaConsumoPorId(idConsumo) {
    try {
        const response = await fetch(`${url_base}/consumo_produto?id=eq.${idConsumo}`, {
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

export async function cadastrarConsumo(dadosConsumo) {
    try {
        const response = await fetch(`${url_base}/consumo_produto`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConsumo)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Consumo de Produto cadastrado com sucesso!');
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        return null;
    }
}


export async function atualizarConsumo(idConsumo, dadosConsumo) {
    try {
        const response = await fetch(`${url_base}/consumo_produto?id=eq.${idConsumo}`, {
            method: 'PUT',
            headers: {
               "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConsumo)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Consumo atualizado com sucesso!');
            window.location.reload()
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        return null;
    }
}



export async function deletarConsumo(idConsumo) {
    try {
        const response = await fetch(`${url_base}/consumo_produto?id=eq.${idConsumo}`, {
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
            sessionStorage.setItem('modalMessage', 'Consumo excluído com sucesso!');
            window.location.reload()
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        return null;
    }
}
