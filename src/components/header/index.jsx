import Image from "next/image";
import Styles from "./styles.module.scss";

export default function Header() {
    const dataAtual = new Date();
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoes);

    return (
        <header className={Styles.header}>
            <Image className={Styles.logo} width={100} height={100} src='/logo.svg' alt='logo' />
            <h1>Bem-vindo de volta, Marcus</h1>
            <h2>{dataFormatada}</h2>
        </header>
    );
}
