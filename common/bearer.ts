export function parse(tokenkey: string) {
    if (tokenkey) {
        let parts = tokenkey.split(' ');        
        if (parts.length === 2) {
            var bearer = parts[0].toLowerCase();
            if (bearer === 'bearer') {
                return parts[1];
            }
        }
    }
    return null;
}