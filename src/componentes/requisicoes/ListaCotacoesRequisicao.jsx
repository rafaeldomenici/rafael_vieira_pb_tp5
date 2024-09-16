import DataTable from 'react-data-table-component';
import '../../App.css'
import { Link, useParams } from 'react-router-dom';
import { listarCotacoes } from '../../infra/cotacoes';
import { useState, useEffect } from 'react';

export default function ListaCotacoesRequisicao() {
  const [data, setData] = useState([]);
  const params = useParams();
  
  async function fetchData() {
    let l = await listarCotacoes();
    let novaLista = l.filter(item => item.requisicao == params.id);
    setData(novaLista);
  }

  useEffect(() => {
    fetchData();
  })

  function handleClick() {
    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach((obj) => {
      let row = obj.requisicao + "," + obj.produto + "," + obj.fornecedor + "," + obj.data + "," + obj.valor;
      csvContent += row + "\r\n";
    })
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  const colunas = [
    {
        name: 'Requisição',
        selector: row => row.requisicao,
        sortable: true,
    },
    {
        name: 'Produto',
        selector: row => row.produto,
        sortable: true,
    },
    {
        name: 'Fornecedor',
        selector: row => row.fornecedor,
    },
    {
        name: 'Data da cotação',
        selector: row => row.data,
    },
    {
      name: 'Valor',
      selector: row => row.valor,
    }
];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

  
  
    return (<>
        <Link to="/requisicoes">Voltar</Link>
        <DataTable
            
            columns={colunas}
            data={data}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            defaultSortFieldId={1}
            selectableRows
            selectableRowsHighlight
            selectableRowsSingle
            
        />
        <input type="button" style={{width: "150px"}} value="Exportar CSV" onClick={handleClick}/>
        </>
    );
}