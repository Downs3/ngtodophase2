(function(){
    'use strict';

    angular.module('homeService', ["ngStorage"])
        .service('homeService', homeService);

    homeService.$inject = ['$localStorage'];

    function homeService($localStorage) {

        // list everything
        var nextItemNum = 1;
        var hs = this;
        hs.currentList = new Number(0);
       // hs.lists = ['Today', 'Tomorrow'];
        hs.storage = $localStorage.$default({
            lists: ['Today','Tomorrow'],
            items:[{
                itemNum:0,
                title: 'Make a to-do list',
                listNum: 0,
                completed: false
            }]});
        //hs.lists = $localStorage.lists;
        hs.items = $localStorage.items;
        /*hs.items = [
            {
                itemNum: Number(0),
                title: 'Make a to-do list',
                listNum: 0,
                completed: false
            }
        ];
        */
        hs.addList = addList;

        hs.addItem = addItem;                   // adds the given item to current list
        hs.removeCompleted = removeCompleted;   // removes all completed items from all lists

        // public functions
        function addList(title) {
            hs.lists.push(
                title
            );
            console.log(hs.lists);
            $localStorage.lists = hs.lists;
            console.log($localStorage.lists);
        }

        function addItem(title) {
            hs.items.push(
                {
                    itemNum: nextItemNum++,
                    title: title,
                    listNum: hs.currentList,
                    completed: false
                }
            );
            $localStorage.items = hs.items;
        }

        function removeCompleted() {
            for (var i=hs.items.length-1; i>=0; i--) {
                if (hs.items[i].completed && hs.items[i].listNum == hs.currentList) {
                    hs.items.splice(i, 1);
                }
            }
        }

        // private functions
        function getItemIndex(itemNum) {
            var index = hs.items.length - 1;
            while (index > 0 && hs.items[index].itemNum !== itemNum) {
                index--;
            }
            return index;
        }
    }

}());
