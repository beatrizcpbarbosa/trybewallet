import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses, getTotalValue } from '../actions/wallet';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoeda = this.handleMoeda.bind(this);
    this.handlValorConvertido = this.handleValorConvertido.bind(this);
    this.handlValorCambio = this.handleCambio.bind(this);
  }

  handleMoeda(expense) {
    const { currency, exchangeRates } = expense;
    const moeda = exchangeRates[currency].name;
    return moeda;
  }

  handleValorConvertido(expense) {
    const { currency, exchangeRates, value } = expense;
    const valor = Number(value * exchangeRates[currency].ask).toFixed(2);
    return valor;
  }

  handleCambio(expense) {
    const { currency, exchangeRates } = expense;
    const cambio = exchangeRates[currency].ask;
    return cambio;
  }

  handleValueTotal(expense) {
    const { firstGetTotalValue, totalValue } = this.props;

    const value = Number(expense.value);
    const valueMoeda = Number(expense.exchangeRates[expense.currency].ask);

    const total = Number((value * valueMoeda).toFixed(2));

    const ValorDeletado = totalValue - total;

    firstGetTotalValue(ValorDeletado);
  }

  render() {
    const { expenses, firstDeleteExpenses } = this.props;
    return (
      <section>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{this.handleMoeda(expense)}</td>
              <td>{this.handleCambio(expense)}</td>
              <td>{this.handleValorConvertido(expense)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ (event) => {
                    event.preventDefault();
                    firstDeleteExpenses(expense.id);
                    this.handleValueTotal(expense);
                  } }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}

        </table>
      </section>
    );
  }
}

// estou pegando os valores do estado global redux
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  totalValue: state.wallet.totalValue,
});

const mapDispatchToProps = (dispatch) => ({
  firstDeleteExpenses: (id) => dispatch(deleteExpenses(id)),
  firstGetTotalValue: (value) => dispatch(getTotalValue(value)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  firstDeleteExpenses: PropTypes.func.isRequired,
  firstGetTotalValue: PropTypes.func.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
