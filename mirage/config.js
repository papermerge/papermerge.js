export default function() {
  this.get('/api/nodes/inboxcount/', () => {
    return {
      "data": {
        "count": 1
      }
    }
  });

  this.get('/api/users/me/', () => {
    return {
      "data":{
        "type":"users",
        "id":"1",
        "attributes":
          {
            "username":"eugen",
            "first_name":"",
            "last_name":"",
            "email":"",
            "is_active":true,
            "is_staff":true,
            "is_superuser":true,
            "date_joined":"2021-11-24T20:54:38.690996+01:00"
          },
          "relationships": {
              "inbox_folder": {
                "data": {
                  "type":"folders",
                  "id":"1"
                }
              },
              "home_folder": {
                "data": {
                  "type":"folders",
                  "id":"2"
                }
              }
          }
      } // data
    } // return
  });

  this.get('/api/folders/2/', () => {
    return {
      "data": {
        "type": "folders",
        "id":"2",
        "attributes": {
          "title": ".home",
          "tags": [],
          "created_at": "2021-11-24T20:54:38.833485+01:00",
          "updated_at":"2021-11-24T20:54:38.833509+01:00"
        },
        "relationships": {
          "parent": {
            "data":null
          }
        }
      }
    }
  });

  this.get('/api/folders/1/', () => {
    return {
      "data": {
        "type": "folders",
        "id":"1",
        "attributes": {
          "title": ".inbox",
          "tags": [],
          "created_at": "2021-11-24T20:54:38.833485+01:00",
          "updated_at":"2021-11-24T20:54:38.833509+01:00"
        },
        "relationships": {
          "parent": {
            "data":null
          }
        }
      }
    }
  });

  this.get('/api/tags/', () => {
    return {
      "data": [
        {
          "type": "tags",
          "id": "1",
          "attributes": {
            "name": "one",
            "bg_color": "#006684",
            "fg_color":"#ffffff",
            "description":"",
            "pinned":false
          }
        }
      ]
    }
  });

  this.get('/api/roles/', () => {
    return {
      "data": []
    }
  });

  this.get('/api/nodes/1/', () => {
    return {
      "data": [
        {
          "type": "folders",
          "id":"4",
          "attributes": {
            "title": "Folder 1",
            "tags": [],
            "created_at": "2021-11-24T20:54:38.833485+01:00",
            "updated_at":"2021-11-24T20:54:38.833509+01:00"
          },
          "relationships": {
            "parent": {
              "data":null
            }
          }
        },
        {
          "type": "folders",
          "id":"5",
          "attributes": {
            "title": "Folder 2",
            "tags": [],
            "created_at": "2021-11-24T20:54:38.833485+01:00",
            "updated_at":"2021-11-24T20:54:38.833509+01:00"
          },
          "relationships": {
            "parent": {
              "data":null
            }
          }
        }
      ],
      "meta": {
        "pagination": {
          "page": 1,
          "pages": 1,
          "count": 2
        }
      },
      "links": {
        "first": "",
        "last": "",
        "next": "",
        "prev": ""
      }
    }
  });

  this.get('/api/nodes/2/', () => {
    return {
      "data": [
        {
          "type": "folders",
          "id":"4",
          "attributes": {
            "title": "Folder 1",
            "tags": [],
            "created_at": "2021-11-24T20:54:38.833485+01:00",
            "updated_at":"2021-11-24T20:54:38.833509+01:00"
          },
          "relationships": {
            "parent": {
              "data":null
            }
          }
        },
        {
          "type": "folders",
          "id":"5",
          "attributes": {
            "title": "Folder 2",
            "tags": [],
            "created_at": "2021-11-24T20:54:38.833485+01:00",
            "updated_at":"2021-11-24T20:54:38.833509+01:00"
          },
          "relationships": {
            "parent": {
              "data":null
            }
          }
        }
      ],
      "meta": {
        "pagination": {
          "page": 1,
          "pages": 1,
          "count": 2
        }
      },
      "links": {
        "first": "",
        "last": "",
        "next": "",
        "prev": ""
      }
    }
  });

  this.get('/api/preferences/', () => {
    return {
      "data": []
    }
  });

}
