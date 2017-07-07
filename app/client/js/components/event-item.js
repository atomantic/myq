module.exports = {
  template: '#event-item-template',
  props: {
    item: Object
  },
  data: function(){
    return {};
  },
  computed: {
    getHeight: function (comp) {
      var start = new Date(comp.item.start.dateTime);
      var end = new Date(comp.item.end.dateTime);
      return (end - start)/1000/60 + 'px';
    },
    getPlacement: function (comp) {
      return comp.item.placement + 'px';
    }
  },
  filters: {
  },
  methods: {
    complete: function () {
    },
    defer: function () {
    },
    reject: function () {
    }
  }
}
