const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";

export async function cadastrarColheita(dadosColheita) {
    try {
        const response = await fetch(`${url_base}/colheita`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosColheita)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Colheita cadastrada com sucesso!');
            window.location.reload()
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar colheita:", error);
        return null;
    }
}


export async function carregarColheitas() {
    try {
        const response = await fetch(`${url_base}/colheita?select=*,cultura(*),terreno(*)`, {
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
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao carregar colheita:", error);
        return null;
    }
}


export async function atualizarColheita(id, dadosColheita) {
    try {
        const response = await fetch(`${url_base}/colheita?id=eq.${id}`, {
            method: 'PUT',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosColheita)
        });
        
        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }


        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Colheita atualizada com sucesso!');
            window.location.reload();
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao atualizar colheita:", error);
        return null;
    }
}


export async function deletarColheita(idColheita) {
    try {
        const response = await fetch(`${url_base}/colheita?id=eq.${idColheita}`, {
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
            sessionStorage.setItem('modalMessage', 'Colheita excluída com sucesso!');
            window.location.reload();
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao deletar colheita:", error);
        return null;
    }
}
