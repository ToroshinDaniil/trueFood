//Замеряет время выполнения запросов на формирование страницы
module.exports = function () {
    this.userRequests = []; //храним для каждого пользователя свои данные
    this.startDate = new Date().getTime();; //храним для каждого пользователя свои данные
    this.endDate = null;
    this.executeTime = null;
    this.indexRequests = {};

    //начали делать http запрос на бек
    this.initRequest = function (url) {

        this.indexRequests[url] = {
            startDate: new Date().getTime()
        }
    }

    //закончили делать http запрос на бек
    this.endRequest = function (url) {

        if (!this.indexRequests[url]) {
            return
        }

        this.indexRequests[url]['endDate'] = new Date().getTime()
        this.indexRequests[url]['executeTime'] = this.indexRequests[url]['endDate'] - this.indexRequests[url]['startDate']
    },

    //закончили формирование всей страницы
    this.finishLog = function () {
        this.endDate = new Date().getTime();
        this.executeTime = this.endDate - this.startDate;
    }
}
