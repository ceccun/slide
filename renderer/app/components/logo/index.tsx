import styles from "./logo.module.css"

export const Logo = ({ exitAnimation }: { exitAnimation: boolean }) => {
    return (<div className={styles.container}>
        <p className={styles.text}>slide</p>
        <div className={styles.slider}></div>
    </div>)
}