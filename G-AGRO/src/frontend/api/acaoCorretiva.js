const url_base = "https://lwqjxjfctbshmvrkwypl.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cWp4amZjdGJzaG12cmt3eXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4Nzg2MDUsImV4cCI6MjA0NTQ1NDYwNX0.LUetN2YkPTk7-r7vqSYNpGm5QvLMmRTl_gHQ9NKYgwo";


export async function cadastrarAcaoCorretiva(dadosAcao) {
    try {
        const response = await fetch(`${url_base}/acaocorretiva`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAcao)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Acao corretiva cadastrada com sucesso!');
            window.location.reload()
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar a acao corretiva:", error);
        return null;
    }
}


export async function carregarAcaoCorretiva() {
    try {
        const response = await fetch(`${url_base}/acaocorretiva?select=*,colheita(*)`, {
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
        console.error("Erro ao carregar Ações Corretivas:", error);
        return null;
    }
}

export async function carregarAcoesCorretivasPorColheita(idColheita) {
    try {
        const response = await fetch(`${url_base}/acaocorretiva?id_colheita=eq.${idColheita}`, {
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
            return data; // Retorna os dados corretamente
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao carregar Ações Corretivas por Colheita:", error);
        return null;
    }
}


export async function atualizarColheita(idAcao, dadosAcao) {
    try {
        const response = await fetch(`${url_base}/acaocorretiva/${idAcao}`, {
            method: 'PUT',
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAcao)
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            sessionStorage.setItem('modalMessage', 'Ação Corretiva atualizada com sucesso!');
            window.location.reload();
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao atualizar Ação Corretiva:", error);
        return null;
    }
}


export async function deletarColheita(idAcao) {
    try {
        const response = await fetch(`${url_base}/acaocorretiva/${idAcao}`, {
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
            sessionStorage.setItem('modalMessage', 'Ação Corretiva excluída com sucesso!');
            window.location.reload();
            return data;
        } else {
            throw new Error(`${data} - Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao deletar Ação Corretiva:", error);
        return null;
    }
}
