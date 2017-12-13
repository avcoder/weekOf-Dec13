var app = new Vue({
  el: "#app",

  mounted: function() {
    fetch("https://randomuser.me/api/?results=5")
      .then(res => res.json())
      .then(emails => {
        this.emails = emails.results;
        this.selectedEmail = this.emails[0];
      })
      .catch(err => console.log(err));
  },

  data: {
    emails: [],
    selectedEmail: "",
    view: "inbox" // options are inbox, trash, etc.
  },

  methods: {
    // return avatar so that img src attribute knows where to get pic
    getPic: function(emailObj) {
      return emailObj.picture.thumbnail;
    },

    // return alt text for image for avatar
    getAlt(emailObj) {
      return `${emailObj.name.first} ${emailObj.name.last}'s avatar`;
    },

    // when user clicks an email make email display on main part of page and add css
    clickedEmail: function(emailObj) {
      this.selectedEmail = emailObj;
    },

    // is used to determine whether the css class for selected should be shown
    // Is what I clicked on the same object as currently selectedEmail?
    // If true, then value will be used in v-bind:class="{ 'email-item-selected': isSelected(email) }
    isSelected: function(emailObj) {
      // returns boolean value
      return emailObj == this.selectedEmail;
    },

    // if user clicks compose button, fetch new email and insert into inbox
    incomingEmail() {
      fetch("https://randomuser.me/api/?results=1")
        .then(res => res.json())
        .then(emails => {
          this.emails.unshift(emails.results[0]);
        })
        .catch(err => console.log(err));
    },

    // used with v-for=email in currentView()
    // IF user clicks Inbox, then show emails that don't have deleted:true
    // If user clicks Trash, then show emails that do have deleted:true
    currentView() {
      switch (this.view) {
        case "inbox":
          return this.emails.filter(email => !email.deleted);
          break;
        case "trash":
          return this.emails.filter(email => email.deleted);
          break;
      }
    },

    // if user clicks Inbox, or Trash, then store it so that currentView()
    // will know which filter to use so to return the appropriate array of emails
    setView(clickedView) {
      this.view = clickedView;
    },

    // if user clicks delete, then store it in the email object, but have to use $set
    // so Vue 'sees' it and reacts to it if any changes happen
    deleteEmail() {
      this.$set(this.selectedEmail, "deleted", true);
    }
  }
});
