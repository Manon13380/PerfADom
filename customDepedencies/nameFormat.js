const nameFormat = (name) => {
    return name.split(/(\s+|-)/)
        .map(part => {
            if (part === "-" || part === " ") {
                return part;
            } else {
                return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            }
        })
        .join("");
}

module.exports = nameFormat