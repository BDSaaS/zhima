import Application from './core/Application'
import Exception from './core/Libs/Exception'
import Container from './core/Container/Container'
import Command from './core/Command/Command'
import Transformer from './core/Transformer/Transformer'
import Lib from './core/Libs/Lib'
import AxiosAdapter from './core/Contracts/AxiosAdapter'
import Vue3Adapter from './core/Contracts/Vue3Adapter'
import CommandProvider from "./core/Provider/CommandProvider"
import HelperProvider from "./core/Provider/HelperProvider"
import HttpProvider from "./core/Provider/HttpProvider"
import ServiceProvider from "./core/Provider/ServiceProvider"
// import VuexAdapter from './Contracts/VuexAdapter'

const providers = [CommandProvider, HelperProvider, HttpProvider, ServiceProvider]

Application.setProviders(providers)

export {
    Application as default,
    Container,
    Exception,
    Command,
    Transformer,
    Lib,
    AxiosAdapter,
    Vue3Adapter,
    // VuexAdapter,
}
