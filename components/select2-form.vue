<template lang="html">
    <div class="select__block">
        <div class="select__cnt" @click="onSelectWrpClick">
            <div class="select" :class="{'select__error': observableError}" @click="onFocusInput">
                <input
                    type="text"
                    class="search__input"
                    required
                    @focus="onFocusInput"
                    ref="search"
                    :disabled="!searchable"
                    @keyup="onInputSearch($event.target.value)" />
                <div class="placeholder" :class="{placeholder__selected: selected && selected.value }">{{placeholder}}</div>
                <div class="select__value" v-if="!inFocus" :class="{'input-size-big': size == 'big'}">{{ selected && selected.label }}</div>



              <!-- basic select -->
                <select
                    class="basic__select"
                    :value="selected ? selected.value : ''"
                    @change="selectedItem($event.target.value)">
                    <option value="" v-if="mobileEmptyOption"></option>
                    <option
                        v-for="option in options"
                        :value="option.value"  >
                        {{option.label}}
                    </option>
                </select>
            </div>

            <div class="select__items" v-show="inFocus">
                <ul class="select__items__ul" v-for="option in listItems">
                    <li class="select__items__li" @click="selectedItem(option.value)">{{option.label}}</li>
                </ul>

                <div class="empty__text" v-show="!listItems.length && searchValue">
                    Ничего не найдено
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "Select",
    props: {
        placeholder: {
            type: String,
            default: 'Выберете вариант'
        },
        errortext: {
            type: [String, Boolean],
            default: null
        },
        options: [Array],
        formKey: String,
        formModel: Object,
        errorEmptyHide: { //убрать блок если нет ошибки
            type: Boolean,
            default: false
        },
        value: {
            type: [Object, Array, String, Number],
            default: null
        },
        size: String,
        mobileEmptyOption: {
            type: Boolean,
            default: true
        },
        name: String,
        searchable: {
          type: Boolean,
          default: true
        },
        dynamicValue: Boolean //если меняются опции - значение пытается сохранить или выбрать что то еще
    },
    data () {
        return {
            observableError: this.errortext,
            observableValue: null,
            searchValue: '',
            inFocus: false,
            selected: {},
        }
    },
    mounted () {

        if (this.value) {

            this.selectedItem(this.value)
        }

        if (this.formModel) {
            this.formModel.$on('validateFields', this.updateErrorText)
        }

        document.addEventListener('click', this.onDocumentClick)
    },
    beforeDestroy () {

        if (this.formModel) {
            this.formModel.$off('validateFields', this.updateErrorText)
        }

        document.removeEventListener('click', this.onDocumentClick)
    },
    computed: {
        listItems () {

            let res = []

            let searchValue = this.searchValue || ''

            searchValue = searchValue.toLowerCase()

            for (var i in this.options) if (this.options.hasOwnProperty(i)) {

                var option = this.options[i]

                const label = option.label.toLowerCase()

                if (!searchValue || ~label.indexOf(searchValue)) {

                    res.push(option)
                }
            }

            return res
        }
    },
    methods: {
        onDocumentClick () {
            this.hideSelectOptions()
        },
        onSelectWrpClick (e) {
            e.stopPropagation()
        },
        inputChangeValue () {
          this.inFocus = !this.inFocus
        },
        onFocusInput () {
            this.inFocus = true
        },
        hideSelectOptions () {
            // setTimeout(() => {

                this.inFocus = false

                this.searchValue = ''

                if (this.$refs.search) {

                    this.$refs.search.value = ''
                }

                //validate
                if (this.formKey && this.formModel) {

                    //this.formModel.blurValidateField(this.formKey)

                    this.updateErrorText()
                }

            //  }, 200)
        },
        selectedItem (value) {

            this.inputChangeValue()

            const option = this.findOptionByValue(value)

            if (!option) {
                value = null
            }

            this.selected = option || {}

            this.observableValue = value

            this.updateValue(value)

            this.hideSelectOptions()


            this.$emit('blur')
        },
        updateValue (value) {

            const option = this.findOptionByValue(value)

            if (!option) {

                value = null
            }

            this.$emit('input', value)
        },
        findOptionByValue (value) {

            for (var i in this.options) if (this.options.hasOwnProperty(i)) {

                var option = this.options[i]

                if (option && option.value == value) {

                    return option
                }
            }

            return null
        },
        updateErrorText () {
            if (!this.formKey || !this.formModel) {
                return;
            }

            this.observableError = this.formModel.fieldError(this.formKey)
        },
        onInputSearch (value) {
            this.searchValue = value
        }
    },
    watch: {
        options (options) {

            let { value } = this.selected

            if (!value) {
                return
            }

            //пытаемся выбрать другое значение
            if (this.dynamicValue) {

                let issetValue = false

                for (var i in options) if (options.hasOwnProperty(i)) {

                    if (options[i]['value'] == value) {
                        issetValue = true
                        break
                    }
                }

                if (!issetValue && options.length) {
                    value = options[options.length-1]['value'];
                }
            }

            this.selectedItem(value)
        },
        value (value) { this.selectedItem(value) },
        errortext (value) { this.observableError = value }
    }
}
</script>

<style lang="sass" scoped>
@import '~assets/css/variables.scss'

.select__cnt
    position: relative

.select
    height: 64px
    border: 1px solid #d8d8d8
    background: #fbfbfb
    border-radius: 4px
    position: relative
    box-sizing: border-box

.select:hover
    //border-color: #999999
    cursor: pointer
    box-shadow: 0 0 4px 0 black

.placeholder
    position: absolute
    top: 53%
    left: 24px
    color: #666
    transform: translateY(-50%)
    z-index: 2
    pointer-events: none
    transition: transform 300ms ease
    transform-origin: 0 -10%
    right: 40px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis



.arrow
  #With-data-list
    cursor: pointer
    fill: #999 !important

.select__items
    position: absolute
    top: 70px
    left: 0
    right: 0
    border-radius: 4px
    box-shadow: 0 0 4px 0 black
    //box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.17)
    //border: solid 1px #999999
    z-index: 14
    padding: 10px 0
    background: white
    max-height: 210px
    overflow-y: auto

.select__items__ul
    list-style-type: none
    margin: 0
    padding: 0

.select__items__li
    padding: 14px 24px
    white-space: nowrap

.select__items__li:hover
    background-color: #f5f5f5
    cursor: pointer

.search__input
    width: 85%
    height: 62px
    box-sizing: border-box
    border: 0
    background: transparent
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    border-radius: 4px
    z-index: 1
    padding-left: 24px
    padding-top: 20px
    font-weight: inherit
    font-size: 18px
    font-family: inherit

.search__input:focus
    outline: none

.select__value
    padding-left: 24px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    padding-right: 44px
    font-size: 18px
    position: relative
    top: 28px

.select__value__infocus
    opacity: 0

.input-size-big
    font-size: 22px

.search__input:focus ~ .placeholder,
.search__input:valid ~ .placeholder,
.placeholder__selected
    transform: scale(0.7777) translateY(-30px)
    right: 0

.search__input:focus ~ .placeholder
    color: #212121

.select__error
    border-color: #ff402b !important

.empty__text
    padding: 15px 24px
    color: #999

.basic__select
    width: 100%
    height: 55px
    box-sizing: border-box
    -webkit-appearance: none
    -moz-appearance: none
    appearance: none
    border: 0
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: transparent
    opacity: 0
    font-size: 27px
    display: none

.basic__select:focus
    outline: none

@media (max-width: 1024px)
    .arrow
      pointer-events: none
    .basic__select
        display: block
    .search__input
        display: none
    .select__items
        display: none !important
</style>
