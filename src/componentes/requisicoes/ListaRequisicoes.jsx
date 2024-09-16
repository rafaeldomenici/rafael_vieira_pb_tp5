import DataTable from 'react-data-table-component';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
export default function ListaRequisicoes({ requisicoes = [], setIdEmEdicao }) {
    
    const colunas = [
        {
        name: 'Usuário',
        selector: row => row.usuario,
        sortable: true,
        },
        {
            name: 'Nome do produto',
            selector: row => row.produtoRequisicao,
            sortable: true,
        },
        {
            name: 'Justificativa',
            selector: row => row.justificativa,
        },
        {
            name: 'Data',
            selector: row => row.dataRequisicao,
            sortable: true
        },
        {
          name: 'Status',
          selector: row => row.status,
        }
        
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

    function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        console.log(id);
        if(id) {
            setIdEmEdicao(id);
        } else {
            setIdEmEdicao("");
        }
    }

  
    return (
        <DataTable
            
            columns={colunas}
            data={requisicoes}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            defaultSortFieldId={4}
            selectableRows
            selectableRowsHighlight
            selectableRowsSingle
            onSelectedRowsChange={handleChange}
        />
    );
}