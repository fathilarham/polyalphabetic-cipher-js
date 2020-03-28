$(document).ready(function () {
    let key
    let phrase
    let final_key
    let encrypted_phrase
    let decrypted_phrase
    $('#keyCopy').hide()
    $('#resultCopy').hide()

    $('#encKey').keyup(function () {
        if ($('#encKey').val().length == 0) {
            $('#keyCopy').hide()
            $('#finalKey').html('')
        } else {
            $('#keyCopy').show()
            key = $('#encKey').val()
            final_key = Array.from(generateKey(key))
            $('#finalKey').html('Key Post Processing : ' + final_key.join(''))
        }
    })

    $('#encPhrase').keyup(function () {
        if ($('#encPhrase').val().length == 0) {
            $('#encResult').val('')
            $('#resultCopy').hide()
        } else {
            $('#resultCopy').show()
            phrase = $('#encPhrase').val()
            encrypted_phrase = encrypt(phrase, final_key)
            $('#encResult').val(encrypted_phrase.join(''))
        }
    })

    $('#decKey').keyup(function () {
        if ($('#decKey').val().length != 0) {
            key = $('#decKey').val()
            final_key = Array.from(generateKey(key))
        }
    })

    $('#decPhrase').keyup(function () {
        if ($('#decPhrase').val().length == 0) {
            $('#decResult').val('')
        } else {
            phrase = $('#decPhrase').val()
            decrypted_phrase = decrypt(phrase, final_key)
            $('#decResult').val(decrypted_phrase.join(''))
        }
    })

    $('#keyCopy').click(function () {
        $('#encKey').select()
        document.execCommand("copy")
        document.getSelection().removeAllRanges()
        alert('Kunci telah di copy')
    })

    $('#resultCopy').click(function () {
        $('#encResult').removeAttr('disabled')
        $('#encResult').select()
        document.execCommand("copy")
        $('#encResult').attr('disabled', true)
        document.getSelection().removeAllRanges()
        alert('Pesan rahasia telah di copy')
    })

    // Encrypt Process Function
    function encrypt(phrase, final_key) {
        let array_phrase = Array.from(phrase)

        array_phrase.forEach(function (character, key) {
            if (toAsci(character) != -64) {
                array_phrase[key] = final_key[toAsci(character) - 1]
            }
        })

        return array_phrase
    }

    // Encrypt Process Function
    function decrypt(phrase, final_key) {
        let array_phrase = Array.from(phrase)
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'
        alphabet = Array.from(alphabet)
        let index

        array_phrase.forEach(function (character, key) {
            if (toAsci(character) != -64) {
                index = final_key.indexOf(character)
                array_phrase[key] = alphabet[index]
            }
        })

        return array_phrase
    }

    // Key Process Function
    function generateKey(key) {
        // Remove space between words
        let unique_key = Array.from(key.replace(/\s+/g, '').toLowerCase())

        // Create Set Var to remove same characters in string
        let set = new Set()

        unique_key.forEach(function (character) {
            // Add each character to Set datatype
            set.add(character)
        })

        unique_key = Array.from(set)

        let alphabet = 'abcdefghijklmnopqrstuvxyz'

        unique_key.forEach(function (character) {
            alphabet = alphabet.replace(character, '')
        })

        let add_key = Array.from(alphabet)

        let final_key = unique_key.join('') + add_key.join('')

        return final_key
    }

    // Shuffle Array Content Function
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // Transform Char to ASCI Function
    function toAsci(char) {
        return char.charCodeAt() - 96
    }

});