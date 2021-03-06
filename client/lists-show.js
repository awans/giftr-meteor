Template.listsShow.helpers({
    items: function() {
        return Items.find({listId: this._id}, {sort: {createdAt: 1}});
    },
    isUsersList: function (list) {
        if (!list || !Meteor.user()) {
            return false;
        }
        return list.userId == Meteor.userId();
    },
    comments: function () {
        return Comments.find({itemId: this._id}, {sort: {createdAt: 1}});
    },
    isUsersComment: function (comment) {
        if (!comment || !Meteor.user()) {
            return false;
        }
        return comment.userId == Meteor.userId();
    }
});

Template.listsShow.events({
    "submit #add-item" : function(e, t) {
        e.preventDefault();
        
        var text = t.$('[name=item-text]').val();

        Meteor.call('addItem', text, this._id);
        t.$('[name=item-text]').val('');
    },
    "submit .add-comment" : function(e) {
        e.preventDefault();
        
        var input = $(e.target).find('[name=comment-text]');        
        var text = input.val();
        Meteor.call('addComment', text, this._id);
        input.val('');
    },
    "click .delete-comment": function() {
        Meteor.call('deleteComment', this._id);
    },
    "click .delete-item": function() {
        Meteor.call('deleteItem', this._id);
    },
});

Template.listsShow.rendered = function(){

};