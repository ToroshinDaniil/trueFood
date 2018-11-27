<template lang="html">
    <div class="input__block">

        <div class="input-form">
            <input
                    class="input"
                    :class="{
                'input-block_error': observableError,
                'input-size-big': size == 'big'
            }"
                    ref="input"
                    :type="inputType"
                    :name="name"
                    :value="observableValue"
                    :readonly="offAutocomplete"
                    required
                    @blur="blurInput($event.target.value)"
                    @change="$emit('change')"
                    @focus="onInputFocus"
                    @input="keyUpInput($event.target.value, $event)" />
            <!-- <input class="input__mask" ref="mask" type="tel" value="334"/> -->
            <div class="placeholder">{{placeholder}}</div>

        </div>

        <div class="input-block__desc"  v-if="!observableError && desc">
            {{desc ? desc : '&nbsp'}}
        </div>

    </div>
</template>

<script>
    import Config from '~/plugins/config.js'

    export default {
        name: "Input",
        props: {
            type: {
                type: String,
                default: 'text' //tel
            },
            offAutocomplete: {
                type: Boolean,
                default: false
            },
            name: String,
            placeholder: String,
            errortext: [String, Boolean],
            errorEmptyHide: { //убрать блок если нет ошибки
                type: Boolean,
                default: false
            },
            formKey: String,
            formModel: Object,
            mask: String,
            value: [String, Number],
            suggestions: String,//region
            suggestionsKladrId: String,
            desc: String,
            loading: {
                type: Boolean,
                default: false
            },
            focus: Boolean,
            format: String, //формат отображения - price
            size: String,
            hint: {
                type: String,
                default: ''
            },
            isBigHeight: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                observableError: this.errortext,
                observableValue: this.formValue(this.value)
            }
        },
        mounted () {


            if (this.formModel) {
                this.formModel.$on('validateFields', this.onEmitValidateFields)
            }

            //focus
            if (this.focus) {
                $(this.$refs.input).focus()
            }
        },
        beforeDestroy () {
            if (this.formModel) {
                this.formModel.$off('validateFields', this.onEmitValidateFields)
            }

            if (this.input_suggestion) {
                this.input_suggestion.remove()
                this.input_suggestion = null
            }

            if (this.mask) {
                $(this.$refs.input).unmask()
            }
        },
        computed: {
            inputType () {

                //on IE
                if (this.mask && Utils.isIE()) {
                    return 'text'
                }

                return this.type
            }
        },
        methods: {
            isPhoneMaskField () {
                return this.mask && this.mask.match(/\+7/)
            },
            onInputFocus (ev) {

                if(this.offAutocomplete) {
                    this.$refs.input.removeAttribute('readonly')
                }

                //+7
                if (this.isPhoneMaskField() && !this.observableValue) {

                    this.updateValue('+7')

                    this.$nextTick(() => {
                        setTimeout(() => this.setCaretPosition(ev.target, 5), 0)
                    })
                }

                if (this.format == 'price') {

                    this.observableValue = this.clearValue(this.observableValue)
                }

                this.$emit('focus')
            },
            blurInput (value) {

                this.updateValue(value)

                //validate
                if (this.formKey && this.formModel) {

                    this.formModel.blurValidateField(this.formKey)

                    this.updateErrorText()
                }

                //form
                if (this.format == 'price') {
                    this.observableValue = this.formValue(value)
                }

                this.$emit('blur', this.clearValue(value))
            },
            updateValue (value) {

                this.$emit('input', this.clearValue(value))

                this.observableValue = this.formValue(value)

                if (!value && this.input_suggestion) {

                    this.emitKladrId(null)
                }
            },
            emitKladrId (kladrid) {
                this.$emit('kladrId', kladrid)
            },
            keyUpInput (value, ev) {

                const formPhone = (phone) => {
                    phone = Utils.clearPhone(phone, false)

                    if (phone.length && phone[0] !== '7') {
                        phone = '7' + phone
                    }

                    return phone
                }

                // 2 цифра должна быть 9 = +7 (9__) ___ __ __
                if (this.isPhoneMaskField()) {

                    let phone = formPhone(value)

                    const oldPhone = formPhone(this.observableValue)

                    const isDeleteInput = oldPhone.length > phone.length

                    if ((phone[1] && phone[1] != '9' || phone.length == 1) && !isDeleteInput) {

                        if (phone.length == 1 && phone[0] !== '7') {
                            value = '79' + phone
                        } else if (phone[1] && phone[1] != '9') {
                            //const left = phone.substr(0, 1)

                            const right = phone.substr(2)

                            phone = '79' + right

                            value = phone
                        }

                        $(this.$refs.input).val(this.formValue(value))

                        $(this.$refs.input).trigger('keyup')

                        this.$nextTick(() => {
                            this.setCaretPosition(ev.target, 5)
                            setTimeout(() => this.setCaretPosition(ev.target, 5), 0)
                            setTimeout(() => this.setCaretPosition(ev.target, 5), 5)
                            setTimeout(() => this.setCaretPosition(ev.target, 5), 25)
                            setTimeout(() => this.setCaretPosition(ev.target, 5), 100)
                        })
                    }
                }

                this.updateValue(value)

                this.$emit('change', this.clearValue(value))

                this.lifeValidateForm()
            },

            updateErrorText () {
                if (!this.formKey || !this.formModel) {
                    return;
                }

                this.observableError = this.formModel.fieldError(this.formKey)
            },

            onEmitValidateFields () {
                this.updateErrorText()
            },

            clearValue (value) {

                if (this.format == 'price') {

                    return parseInt((value + '').replace(/ /g, '')) || 0
                }

                return value
            },

            formValue (value) {

                if (this.format == 'price') {
                    value = this.clearValue(value)
                    return Utils.priceFormat(value)
                }

                //mask
                if (this.mask && this.$refs.input) {
                    value = $(this.$refs.input).masked(value)
                }

                return value
            },

            setValue (v) {
                this.observableValue = this.formValue(v)
                this.$refs.input.value = this.formValue(v)
            },

            setCaretPosition(elem, caretPos) {

                if (elem === null) {
                    return
                }

                if(elem.createTextRange) {

                    var range = elem.createTextRange()

                    range.move('character', caretPos)

                    range.select()

                } else if (elem.selectionStart) {

                    elem.focus()

                    elem.setSelectionRange(caretPos, caretPos)

                } else {

                    elem.focus()
                }
            }
        },
        watch: {
            errortext (value) { this.observableError = value },
            value (value) { this.setValue(value) },
            suggestionsKladrId (value) {

                if (this.input_suggestion) {

                    this.input_suggestion.suggestions().setOptions({
                        constraints: {
                            locations: { kladr_id: value },
                        },
                        // в списке подсказок не показываем область и город
                        restrict_value: true
                    })
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '~assets/css/variables.scss'

    .input-form
        position: relative

    .input,
    .input__mask
        height: 64px
        border: 1px solid #d8d8d8
        background-color: #fbfbfb
        border-radius: 4px
        width: 100%
        box-sizing: border-box
        padding: 0 24px
        font-size: 18px
        font-weight: inherit
        font-family: inherit
        transition: background-color .25s, border-color .25s
        padding-top: 20px
        -webkit-appearance: none
        -moz-appearance: none
        appearance: none

    .error-field__big
        height: 30px !important

    .input-size-big
        font-size: 22px

    .input:hover,
    .input__mask:hover
        border-color: #999999

    .input
        position: relative
        z-index: 2

    .input__mask
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        color: rgba(0,0,0,.35)
        z-index: 1
        background: white

    .placeholder
        position: absolute
        z-index: 3
        left: 24px
        top: 0
        bottom: 0
        pointer-events: none
        line-height: 64px
        vertical-align: middle
        font-size: 18px
        color: #666
        transition: transform 300ms ease
        transform-origin: 0 0%

    .input:focus ~ .placeholder,
    .input:valid ~ .placeholder
        transform: scale(0.7777) translateY(-13%)

    .input:focus ~ .placeholder
        color: black

    .input:focus
        outline: 0
        background-color: white
        border-color: #999

    .input-block_error
        border-color: #ff402b !important

    .input-block__desc
        margin-left: 24px
        margin-top: 4px
        color: #999
        font-size: 13px
</style>
