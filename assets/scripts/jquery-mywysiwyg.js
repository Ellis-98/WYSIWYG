/**
 * @file jQuery plugin for myWYSIWYG project
 * @author Faycal Allouache <faycal.allouache@epitech.eu>
 * @author Pierre Schaefer <pierre.schaefer@epitech.eu>
 * @author Judikaël Bellance <judikael1.bellance@epitech.eu>
 * @author Adrien Marion <adrien.marion@epitech.eu>
 */

jQuery(function ($) {
    $.fn.myWysiwyg = function (options = {
        option1: 'bold',
        option2: 'italic',
        option3: 'strike through',
        option4: 'fore color',
        option5: 'font size'
    }) {
        /**
         * Variables
         */
        const $textarea = $('#textarea');

        // Inputs & selects
        let $inputBold, $inputItalic, $inputStrikethrough, $selectForeColor;
        let $optionsForeColor, $selectFontSize, $optionsFontSize;
        let $inputCreateLink, $inputUnlink, $inputOutdent, $inputIndent;
        let $inputJustifyLeft, $inputJustifyRight, $inputJustifyCenter;
        let $inputJustifyFull, $inputSourceCode = undefined, $inputNormalDisplay = undefined;
        let $inputSave;
        // Editeur
        let $divEditor = $('<div class="edit" id="editor" contentEditable></div>');
        // Divers
        let code = "normal display";

        for (const option in options) {
            if (jQuery.type(options[option]) === 'array') {
                for (let i = 0; i < options[option].length; i++) {
                    if (options[option][i] === 'bold') {
                        inputBold()
                    }

                    if (options[option][i] === 'italic') {
                        inputItalic()
                    }

                    if (options[option][i] === 'strike through') {
                        inputStrikeThrough()
                    }

                    if (options[option][i] === 'fore color') {
                        selectForeColor()
                    }

                    if (options[option][i] === 'font size') {
                        selectFontSize()
                    }

                    if (options[option][i] === 'link') {
                        inputLink()
                    }

                    if (options[option][i] === 'outdent') {
                        inputOutdent()
                    }

                    if (options[option][i] === 'indent') {
                        inputIndent()
                    }

                    if (options[option][i] === 'justify left') {
                        inputJustifyLeft()
                    }

                    if (options[option][i] === 'justify right') {
                        inputJustifyRight()
                    }

                    if (options[option][i] === 'justify center') {
                        inputJustifyCenter()
                    }

                    if (options[option][i] === 'justify full') {
                        inputJustifyFull()
                    }

                    if (options[option][i] === 'source code') {
                        inputSourceCode()
                    }

                    if (options[option][i] === 'save') {
                        inputSave()
                    }
                }
            } else {
                if (options[option] === 'bold') {
                    inputBold()
                }

                if (options[option] === 'italic') {
                    inputItalic()
                }

                if (options[option] === 'strike through') {
                    inputStrikeThrough()
                }

                if (options[option] === 'fore color') {
                    selectForeColor()
                }

                if (options[option] === 'font size') {
                    selectFontSize()
                }

                if (options[option] === 'link') {
                    inputLink()
                }

                if (options[option] === 'outdent') {
                    inputOutdent()
                }

                if (options[option] === 'indent') {
                    inputIndent()
                }

                if (options[option] === 'justify left') {
                    inputJustifyLeft()
                }

                if (options[option] === 'justify right') {
                    inputJustifyRight()
                }

                if (options[option] === 'justify center') {
                    inputJustifyCenter()
                }

                if (options[option] === 'justify full') {
                    inputJustifyFull()
                }

                if (options[option] === 'source code') {
                    inputSourceCode()
                }

                if (options[option] === 'save') {
                    inputSave()
                }
            }
        }

        // Editeur
        $textarea.append($divEditor)
        // Variable
        $divEditor = $('#editor')

        // Nouveau paragraphe à chaque saut de ligne
        document.execCommand("defaultParagraphSeparator", false, "p")
        // Activation/désactivation boutons "Code source" & "Affichage normal"
        if ($inputSourceCode !== undefined) {
            if (localStorage.getItem('code') === 'source code') {
                $inputSourceCode.attr('disabled', 'disabled')
            } else {
                $inputNormalDisplay.attr('disabled', 'disabled')
            }
        }

        if (localStorage.getItem('textarea')) {
            $divEditor[0].innerHTML = localStorage.getItem('textarea')
            setInterval(function () {
                localStorage.setItem('textarea', $divEditor[0].innerHTML)
            }, 300000)
            if ($divEditor[0] !== localStorage.getItem('textarea')) {
                window.onbeforeunload = function (event) {
                    event.preventDefault()
                }
            }
        }

        function command(name, arg) {
            if (typeof arg === 'undefined') {
                arg = ''
            }
            switch (name) {
                case 'createLink':
                    arg = prompt("Indiquez l'URL")
                    break
            }
            document.execCommand(name, false, arg)
        }

        function inputBold() {
            $inputBold = $('<input class="button" type="button" value="G" />')
            $textarea.append($inputBold)
            $inputBold.css('font-weight', 'bold')
            $inputBold.click(function () {
                command('bold')
            })
        }

        function inputItalic() {
            $inputItalic = $('<input class="button" type="button" value="I" />')
            $textarea.append($inputItalic)
            $inputItalic.css('font-style', 'italic')
            $inputItalic.click(function () {
                command('italic')
            })
        }

        // Texte barré
        function inputStrikeThrough() {
            $inputStrikethrough = $('<input class="button" type="button" value="B" />')
            $textarea.append($inputStrikethrough)
            $inputStrikethrough.css('text-decoration', 'line-through')
            $inputStrikethrough.click(function () {
                command('strikeThrough')
            })
        }

        // Couleur
        function selectForeColor() {
            $selectForeColor = $('<select></select>')
            $optionsForeColor = $('<option disabled>- Couleur -</option>' +
                '<option value="black" selected>Noir (défaut)</option>' +
                '<option value="blue">Bleu</option>' +
                '<option value="green">Vert</option>' +
                '<option value="red">Rouge</option>' +
                '<option value="orange">Orange</option>' +
                '<option value="yellow">Jaune</option>' +
                '<option value="pink">Rose</option>' +
                '<option value="purple">Mauve</option>')
            $textarea.append($selectForeColor)
            $selectForeColor.append($optionsForeColor)
            $selectForeColor.change(function () {
                command('foreColor', this.value)
            })
        }

        // Taille police
        function selectFontSize() {
            $selectFontSize = $('<select></select>')
            $optionsFontSize = $('<option disabled>- Taille police -</option>' +
                '<option value="1">1</option>' +
                '<option value="2">2</option>' +
                '<option value="3" selected>3 (défaut)</option>' +
                '<option value="4">4</option>' +
                '<option value="5">5</option>' +
                '<option value="6">6</option>')
            $textarea.append($selectFontSize)
            $selectFontSize.append($optionsFontSize)
            $selectFontSize.change(function () {
                command('fontSize', this.value)
            })
        }

        // Lien
        function inputLink() {
            $inputCreateLink = $('<input class="button" type="button" value="Lien" />')
            $inputUnlink = $('<input class="button" type="button" value="Lien" />')
            $textarea.append($inputCreateLink)
            $textarea.append($inputUnlink)
            $inputUnlink.css('text-decoration', 'line-through')
            $inputCreateLink.click(function () {
                command('createLink')
            })
            $inputUnlink.click(function () {
                command('unlink')
            })
        }

        // Diminuer le retrait
        function inputOutdent() {
            $inputOutdent = $('<input class="button" type="button" value="<-" />')
            $textarea.append($inputOutdent)
            $inputOutdent.click(function () {
                command('outdent')
            })
        }

        // Augmenter le retrait
        function inputIndent() {
            $inputIndent = $('<input class="button" type="button" value="->" />')
            $textarea.append($inputIndent)
            $inputIndent.click(function () {
                command('indent')
            })
        }

        // Alignement du texte à gauche
        function inputJustifyLeft() {
            $inputJustifyLeft = $('<input class="button" type="button" ' +
                'value="Aligner à gauche" />')
            $textarea.append($inputJustifyLeft)
            $inputJustifyLeft.click(function () {
                command('justifyLeft')
            })
        }

        // Alignement du texte à droite
        function inputJustifyRight() {
            $inputJustifyRight = $('<input class="button" type="button" ' +
                'value="Aligner à droite" />')
            $textarea.append($inputJustifyRight)
            $inputJustifyRight.click(function () {
                command('justifyRight')
            })
        }

        // Alignement du texte au centre
        function inputJustifyCenter() {
            $inputJustifyCenter = $('<input class="button" type="button" ' +
                'value="Aligner au centre" />')
            $textarea.append($inputJustifyCenter)
            $inputJustifyCenter.click(function () {
                command('justifyCenter')
            })
        }

        // Alignement du texte justifié
        function inputJustifyFull() {
            $inputJustifyFull = $('<input class="button" type="button" value="Justifier" />')
            $textarea.append($inputJustifyFull)
            $inputJustifyFull.click(function () {
                command('justifyFull')
            })
        }

        // Switch entre code source et affichage normal
        function inputSourceCode() {
            $inputSourceCode = $('<input class="button" type="button" value="Code source" />')
            $inputNormalDisplay = $('<input class="button" type="button" ' +
                'value="Affichage normal" />')
            $textarea.append($inputSourceCode)
            $textarea.append($inputNormalDisplay)
            $inputSourceCode.click(function () {
                $inputSourceCode.attr('disabled', 'disabled')
                $inputNormalDisplay.removeAttr('disabled', 'disabled')
                $divEditor[0].innerText = $divEditor[0].innerHTML
                code = "source code"
            })
            $inputNormalDisplay.click(function () {
                $inputSourceCode.removeAttr('disabled', 'disabled')
                $inputNormalDisplay.attr('disabled', 'disabled')
                $divEditor[0].innerHTML = $divEditor[0].innerText
                code = "normal display"
            })
        }

        // Sauvegarde fichier localStorage
        function save_to_LocalStorage() {
            localStorage.setItem('textarea', $divEditor[0].innerHTML)
            localStorage.setItem('code', code)
        }


        // Sauvegarde
        function inputSave() {
            $inputSave = $('<input class="button" type="button" value="Sauvegarder" />')
            $textarea.append($inputSave)
            $inputSave.click(function () {
                save_to_LocalStorage()
            })
        }
    }
})