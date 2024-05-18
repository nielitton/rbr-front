export const formatDate = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');

    let formattedValue = '';
    for (let i = 0; i < cleanedValue.length && i < 8; i++) {
        if (i === 2 || i === 4) {
            formattedValue += '/';
        }
        formattedValue += cleanedValue[i];
    }
    return formattedValue;
};

export const formatDateToLocal = (dateString: string): string => {
    // Extrai os componentes da data
    const [datePart, rest] = dateString.split('T');
    const [year, month, day] = datePart.split('-');

    // Formata a data no formato DD/MM/AAAA
    return `${day}/${month}/${year}`;
};