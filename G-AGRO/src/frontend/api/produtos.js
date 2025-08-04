const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function carregarProdutos() {
    try {
        const response = await fetch(`${url_base}/produto`, {
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
            console.error('Erro ao carregar os produtos', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao carregar os produto:', error);
        return null;
    }
}

export async function carregaProdutoPorId(idProduto) {
    try {
        const response = await fetch(`${url_base}/produto?id=eq.${idProduto}`, {
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
            console.log(`Produto com id: ${idProduto} carregada com sucesso`, data);
            return data;
        } else {
            console.error(`Erro ao carregar o produto com id: ${idProduto}`, data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error(`Erro ao carregar o produto com id: ${idProduto}:`, error);
        return null;
    }
}


export async function cadastrarProduto(dadosProduto) {
    try {
        const response = await fetch(`${url_base}/produto`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            console.log('Produto cadastrado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Produto cadastrado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao cadastrar o produto', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
        return null;
    }
}


export async function atualizarProduto(idProduto, dadosProduto) {
    try {
        const response = await fetch(`${url_base}/produto?id=eq.${idProduto}`, {
            method: 'PUT',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Produto atualizado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao atualizar o produto', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao atualizar a cultura:', error);
        return null;
    }
}


export async function deletarProduto(idProduto) {
    try {
        const response = await fetch(`${url_base}/produto?id=eq.${idProduto}`, {
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
            console.log('Produto deletado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Produto excluído com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao deletar o produto', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao deletar o produto:', error);
        return null;
    }
}


export async function cadastrarConsumoProduto(dadosConsumo){
    try{
        const response = await fetch(`${url_base}/consumo_produto`,{
            method: "POST",
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConsumo)
        })

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            console.log('Consumo de Produto cadastrado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Produto cadastrado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao cadastrar o consumo', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao cadastrar o consumo:', error);
        return null;
    }
}
