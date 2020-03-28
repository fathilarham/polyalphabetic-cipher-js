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
            key = $('#encKey').val()
            if ($('#encPhrase').val().length != 0) {
                $('#keyCopy').show()
                final_key = Array.from(generateKey(key, phrase))
                $('#finalKey').html('Key Post Processing : ' + final_key.join(''))
            }
        }

    })

    $('#encPhrase').keyup(function () {
        if ($('#encPhrase').val().length == 0) {
            $('#encResult').val('')
            $('#resultCopy').hide()
        } else {
            phrase = $('#encPhrase').val()
            key = $('#encKey').val()

            final_key = Array.from(generateKey(key, phrase))
            $('#finalKey').html('Key Post Processing : ' + final_key.join(''))
            $('#keyCopy').show()

            $('#resultCopy').show()
            encrypted_phrase = encrypt(phrase, final_key)
            $('#encResult').val(encrypted_phrase.join(''))
        }
    })

    $('#decPhrase').keyup(function () {
        if ($('#decPhrase').val().length == 0) {
            $('#decResult').val('')
        } else {
            phrase = $('#decPhrase').val()
            key = $('#decKey').val()
            final_key = Array.from(generateKey(key, phrase))
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
        let array_key = Array.from(final_key)

        array_phrase.forEach(function (character, key) {
            if (toAsci(character) != -64) {
                let phrase_asci = toAsci(array_phrase[key])
                let key_asci = toAsci(array_key[key])
                let char_add = (phrase_asci + key_asci) % 26
                array_phrase[key] = toChar(char_add)
                // console.log((phrase_asci + key_asci) % 26)
            }
        })

        return array_phrase
    }

    // Encrypt Process Function
    function decrypt(phrase, final_key) {
        let array_phrase = Array.from(phrase)
        let array_key = Array.from(final_key)

        array_phrase.forEach(function (character, key) {
            if (toAsci(character) != -64) {
                let phrase_asci = toAsci(array_phrase[key])
                let key_asci = toAsci(array_key[key])
                let char_add = (phrase_asci - key_asci + 26) % 26
                array_phrase[key] = toChar(char_add)
            }
        })

        return array_phrase
    }

    // Key Process Function
    function generateKey(key, phrase) {
        // Remove space between words
        key = key.replace(/\s+/g, '').toLowerCase()
        let add_key = ''
        let final_key

        if (key.length > phrase.length) {
            final_key = key.slice(0, phrase.length)
        } else {
            let n = 0
            for (let index = 0; index < phrase.length - key.length; index++) {
                add_key = add_key + key[n]
                /// Configure N for Key
                if (n == key.length - 1) {
                    n = 0
                } else {
                    n = n + 1
                }
            }
            final_key = key + add_key
        }
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

    // Transform ASCI to Char Function
    function toChar(asci) {
        return String.fromCharCode(asci + 96)
    }

});