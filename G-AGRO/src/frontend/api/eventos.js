const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function carregarEventos(){
    try{
        const response = await fetch(`${url_base}/evento?select=*,plantio(*),colheita(*)`, {
            method: 'GET',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        
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
            console.error('Erro ao carregar os evento', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
    }catch(error){
        console.error('Erro ao carregar o evento:', error);
        return null;
    }
}

export async function carregarEventoPorId(idEvento){
    try{
        const response = await fetch(`${url_base}/evento?id=eq.${idEvento}`, {
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
            console.log(`Evento com id: ${idEvento} carregado com sucesso`, data);
            return data;
        } else {
            console.error(`Erro ao carregar o evento com id: ${idEvento}`, data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error(`Erro ao carregar o evento com id: ${idEvento}:`, error);
        return null;
    }
}



export async function cadastrarEvento(dadosEvento){
    try {
        const response = await fetch(`${url_base}/evento`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEvento) 
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            console.log('Evento cadastrado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Evento cadastrado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao cadastrar o evento', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao cadastrar o evento:', error);
        return null;
    }
}

export async function updateEvento(idEvento, dadosEvento){
    try {
        const response = await fetch(`${url_base}/evento?id=eq.${idEvento}`, {
            method: 'PUT',
            headers: {
               "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEvento)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Converte para JSON
        } else {
            data = await response.text(); // Caso não seja JSON, pega o texto da resposta
        }

        if (response.ok) {
            console.log('Evento atualizado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Evento atualizado com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao atualizar o evento', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao atualizar o evento:', error);
        return null;
    }
}

export async function deleteEvento(idEvento){
    try {
        const response = await fetch(`${url_base}/evento?id=eq.${idEvento}`, {
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
            console.log('Evento deletado com sucesso', data);
            sessionStorage.setItem('modalMessage', 'Evento excluído com sucesso!');
            window.location.reload()
            return data;
        } else {
            console.error('Erro ao deletar o evento', data);
            throw new Error(`${data} - Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro ao deletar o evento:', error);
        return null;
    }
}