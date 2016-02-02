(function(){
    'use strict';

    angular.module('homeService', [])
        .service('homeService', homeService);

    homeService.$inject = [];

    function homeService() {

        // list everything
        var nextItemNum = 1;
        var hs = this;
        hs.currentList = new Number(0);
        hs.lists = ['Today', 'Later'];
        hs.items = [
            {
                itemNum: Number(0),
                title: 'Git \'r dun',
                listNum: 0,
                completed: false
            }
        ];
        hs.addList = addList;

        hs.addItem = addItem;                   // adds the given item to current list
        hs.removeCompleted = removeCompleted;   // removes all completed items from all lists

        // public functions
        function addList(title) {
            hs.lists.push(
                title
            );
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
