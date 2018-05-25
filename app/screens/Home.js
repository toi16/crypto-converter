import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { AlertConsumer } from '../components/Alert';
import { AnimateIn } from '../components/Animations';

import {
  changeCurrencyAmount,
  swapCurrency,
  getInitialConversion,
  getCoinList,
} from '../actions/currencies';

const EUR = 'EUR';
const USD = 'USD';
const BTC = 'BTC';
const LTC = 'LTC';
const ETH = 'ETH';

class Home extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(getCoinList());
    this.props.dispatch(getInitialConversion());
  }

  componentDidUpdate(prevProps) {
    if (this.props.currencyError && !prevProps.currencyError) {
      this.props.alertWithType('error', 'Error', this.props.currencyError);
    }
  }

  handleChangeText = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base',
    });
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote',
    });
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

  selectBase = () => {
    switch (this.props.baseCurrency) {
      case EUR:
        return this.props.conversionRateEur || 0.0;
      case USD:
        return this.props.conversionRateUsd || 0.0;
      case BTC:
        return this.props.conversionRateBtc || 0.0;
      case LTC:
        return this.props.conversionRateLtc || 0.0;
      case ETH:
        return this.props.conversionRateEth || 0.0;
      default:
        return 0.0;
    }
  };

  render() {
    let quotePrice = '...';
    const labelRate = this.selectBase() || 0.0;
    if (!this.props.isFetching) {
      const cRate = 1 / this.selectBase();

      quotePrice = (cRate * this.props.amount).toFixed(2) || 0.0;
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar barStyle="light-content" />
        <Header
          onPress={this.handleOptionsPress}
          isConnected={this.props.isConnected}
          onWarningPress={this.handleDisconnectedPress}
        />
        <KeyboardAvoidingView behavior="padding">
          <AnimateIn type="fromTop">
            <Logo tintColor={this.props.primaryColor} />
          </AnimateIn>
          <AnimateIn type="fadeIn" delay={500}>
            <InputWithButton
              buttonText={this.props.baseCurrency}
              onPress={this.handlePressBaseCurrency}
              defaultValue={this.props.amount.toString()}
              keyboardType="numeric"
              onChangeText={this.handleChangeText}
              keyboardAppearance="dark"
              textColor={this.props.primaryColor}
            />
            <InputWithButton
              editable={false}
              buttonText={this.props.quoteCurrency}
              onPress={this.handlePressQuoteCurrency}
              value={quotePrice}
              textColor={this.props.primaryColor}
            />
          </AnimateIn>
          <AnimateIn type="fromBottom" delay={500} duration={750}>
            <LastConverted
              date={this.props.lastConvertedDate}
              base={this.props.quoteCurrency}
              quote={this.props.baseCurrency}
              // conversionRate={labelRate}
            />
            {/* <ClearButton onPress={this.handleSwapCurrency} text="Reverse Currencies" /> */}
          </AnimateIn>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency } = state.currencies;
  const conversionSelector = state.currencies.conversions[quoteCurrency] || {};
  const ratesUsd = conversionSelector.price_usd || {};
  const ratesBtc = conversionSelector.price_btc || {};
  const ratesLtc = conversionSelector.price_ltc || {};
  const ratesEur = conversionSelector.price_eur || {};
  const ratesEth = conversionSelector.price_eth || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRateUsd: ratesUsd || 0,
    conversionRateBtc: ratesBtc || 0,
    conversionRateLtc: ratesLtc || 0,
    conversionRateEur: ratesEur || 0,
    conversionRateEth: ratesEth || 0,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    isFetching: conversionSelector.isFetching,
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

const ConnectedHome = connect(mapStateToProps)(Home);

export default props => (
  <AlertConsumer>
    {context => <ConnectedHome alertWithType={context.alertWithType} {...props} />}
  </AlertConsumer>
);
