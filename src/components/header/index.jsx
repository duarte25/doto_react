import Image from "next/image";
import Styles from "./styles.module.scss";

export default function Header() {

    return (
        <header className={Styles.header}>
            <Image className={Styles.logo} width={100} height={100} src='/logo.svg' alt='logo' />
            <h1>Bem-vindo de volta, Marcus</h1>
            {/* Data de agora amigo */}
            <h2>Segunda, 01 de dezembro de 2025</h2>
        </header>
    )
}