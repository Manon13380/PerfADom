const genererMotDePasse = ()=> {
    const longueur = 8;
    const caracteresSpeciaux = '!@#$%^&*()-_=+';
    const majuscule = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const minuscule = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const chiffre = Math.floor(Math.random() * 10);
    const caractereSpecial = caracteresSpeciaux[Math.floor(Math.random() * caracteresSpeciaux.length)];
    const autresCaracteres = Array.from({ length: longueur - 4 }, () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + caracteresSpeciaux.replace('<', '').replace('>', '');
        return caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }).join('');

    const motDePasse = majuscule + minuscule + chiffre + caractereSpecial + autresCaracteres;

    return motDePasse;
}

module.exports = genererMotDePasse