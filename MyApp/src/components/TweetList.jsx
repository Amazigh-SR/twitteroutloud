import { Timeline, Tweet } from 'react-twitter-widgets'
import {useEffect, useState} from 'react';
import axios from 'axios';


export default function TweetList(props){
  const [tweets, setTweets] = useState([])
  
  useEffect(() =>{
    axios.get('http://localhost:3001/tweets', {withCredentials: true})
        .then(tweets => {
          setTweets(tweets.data)
          console.log(tweets.data)
        })
        .catch(err => console.error(err))
  }, [])
  
  const mockData = [
    {
        "created_at": "Fri Apr 09 18:43:05 +0000 2021",
        "id": 1380592118909923300,
        "id_str": "1380592118909923329",
        "full_text": "RT @backlon: AAHHH THIS IS GREAT!!\n\nhttps://t.co/YO7BAwYIvV",
        "truncated": false,
        "display_text_range": [
            0,
            59
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "backlon",
                    "name": "Dieter Bohn",
                    "id": 1090141,
                    "id_str": "1090141",
                    "indices": [
                        3,
                        11
                    ]
                }
            ],
            "urls": [
                {
                    "url": "https://t.co/YO7BAwYIvV",
                    "expanded_url": "https://gizmodo.com/were-archiving-yahoo-answers-so-youll-always-know-how-b-1846643969?utm_source=twitter&utm_medium=SocialMarketing&utm_campaign=dlvrit&utm_content=gizmodo",
                    "display_url": "gizmodo.com/were-archiving…",
                    "indices": [
                        36,
                        59
                    ]
                }
            ]
        },
        "source": "<a href=\"http://itunes.apple.com/us/app/twitter/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 69426451,
            "id_str": "69426451",
            "name": "Casey Newton",
            "screen_name": "CaseyNewton",
            "location": "San Francisco",
            "description": "I write @platformer, a publication about big tech and democracy. | casey@platformer.news | instagram: @crumbler",
            "url": "https://t.co/9lsZgIjBbh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/9lsZgIjBbh",
                            "expanded_url": "https://www.platformer.news/",
                            "display_url": "platformer.news",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 121227,
            "friends_count": 863,
            "listed_count": 3404,
            "created_at": "Thu Aug 27 22:37:09 +0000 2009",
            "favourites_count": 216048,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": true,
            "verified": true,
            "statuses_count": 9726,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme14/bg.gif",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme14/bg.gif",
            "profile_background_tile": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1053792942966497280/BOEYtrXe_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1053792942966497280/BOEYtrXe_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/69426451/1601674745",
            "profile_link_color": "009999",
            "profile_sidebar_border_color": "EEEEEE",
            "profile_sidebar_fill_color": "EFEFEF",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweeted_status": {
            "created_at": "Fri Apr 09 18:42:25 +0000 2021",
            "id": 1380591948818313200,
            "id_str": "1380591948818313216",
            "full_text": "AAHHH THIS IS GREAT!!\n\nhttps://t.co/YO7BAwYIvV",
            "truncated": false,
            "display_text_range": [
                0,
                46
            ],
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [],
                "urls": [
                    {
                        "url": "https://t.co/YO7BAwYIvV",
                        "expanded_url": "https://gizmodo.com/were-archiving-yahoo-answers-so-youll-always-know-how-b-1846643969?utm_source=twitter&utm_medium=SocialMarketing&utm_campaign=dlvrit&utm_content=gizmodo",
                        "display_url": "gizmodo.com/were-archiving…",
                        "indices": [
                            23,
                            46
                        ]
                    }
                ]
            },
            "source": "<a href=\"https://about.twitter.com/products/tweetdeck\" rel=\"nofollow\">TweetDeck</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 1090141,
                "id_str": "1090141",
                "name": "Dieter Bohn",
                "screen_name": "backlon",
                "location": "San Francisco, CA",
                "description": "Executive Editor, The Verge. Tech commentary. Human typo machine don’t @ me",
                "url": "https://t.co/DY1lIa4P2a",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/DY1lIa4P2a",
                                "expanded_url": "http://theverge.com",
                                "display_url": "theverge.com",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 169664,
                "friends_count": 1361,
                "listed_count": 3685,
                "created_at": "Tue Mar 13 14:29:47 +0000 2007",
                "favourites_count": 20851,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": true,
                "verified": true,
                "statuses_count": 5554,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "FFFFFF",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme14/bg.gif",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme14/bg.gif",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/1258868483636383744/-CJizwPg_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1258868483636383744/-CJizwPg_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/1090141/1606373073",
                "profile_link_color": "0A3057",
                "profile_sidebar_border_color": "FFFFFF",
                "profile_sidebar_fill_color": "FFFFFF",
                "profile_text_color": "333333",
                "profile_use_background_image": false,
                "has_extended_profile": false,
                "default_profile": false,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 19,
            "favorite_count": 195,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "possibly_sensitive_appealable": false,
            "lang": "en"
        },
        "is_quote_status": false,
        "retweet_count": 19,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Fri Apr 09 16:01:12 +0000 2021",
        "id": 1380551379442225200,
        "id_str": "1380551379442225152",
        "full_text": "Looking forward to a Friday night Space Off with legends @karaswisher, @RMac18 and @jacknicas. Tonight at 5:30P PT! https://t.co/yM7yYKnPbx https://t.co/oDVwGw3lxW",
        "truncated": false,
        "display_text_range": [
            0,
            139
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "karaswisher",
                    "name": "Kara Swisher",
                    "id": 5763262,
                    "id_str": "5763262",
                    "indices": [
                        57,
                        69
                    ]
                },
                {
                    "screen_name": "RMac18",
                    "name": "Ryan Mac🙃",
                    "id": 47191293,
                    "id_str": "47191293",
                    "indices": [
                        71,
                        78
                    ]
                },
                {
                    "screen_name": "jacknicas",
                    "name": "Jack Nicas",
                    "id": 17892496,
                    "id_str": "17892496",
                    "indices": [
                        83,
                        93
                    ]
                }
            ],
            "urls": [
                {
                    "url": "https://t.co/yM7yYKnPbx",
                    "expanded_url": "https://twitter.com/karaswisher/status/1380550960095842306",
                    "display_url": "twitter.com/karaswisher/st…",
                    "indices": [
                        116,
                        139
                    ]
                }
            ],
            "media": [
                {
                    "id": 1380551376204263400,
                    "id_str": "1380551376204263426",
                    "indices": [
                        140,
                        163
                    ],
                    "media_url": "http://pbs.twimg.com/media/Eyi0KYTU8AIv1r4.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/Eyi0KYTU8AIv1r4.jpg",
                    "url": "https://t.co/oDVwGw3lxW",
                    "display_url": "pic.twitter.com/oDVwGw3lxW",
                    "expanded_url": "https://twitter.com/CaseyNewton/status/1380551379442225152/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 1103,
                            "h": 1183,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 1103,
                            "h": 1183,
                            "resize": "fit"
                        },
                        "small": {
                            "w": 634,
                            "h": 680,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 1380551376204263400,
                    "id_str": "1380551376204263426",
                    "indices": [
                        140,
                        163
                    ],
                    "media_url": "http://pbs.twimg.com/media/Eyi0KYTU8AIv1r4.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/Eyi0KYTU8AIv1r4.jpg",
                    "url": "https://t.co/oDVwGw3lxW",
                    "display_url": "pic.twitter.com/oDVwGw3lxW",
                    "expanded_url": "https://twitter.com/CaseyNewton/status/1380551379442225152/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 1103,
                            "h": 1183,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 1103,
                            "h": 1183,
                            "resize": "fit"
                        },
                        "small": {
                            "w": 634,
                            "h": 680,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://itunes.apple.com/us/app/twitter/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 69426451,
            "id_str": "69426451",
            "name": "Casey Newton",
            "screen_name": "CaseyNewton",
            "location": "San Francisco",
            "description": "I write @platformer, a publication about big tech and democracy. | casey@platformer.news | instagram: @crumbler",
            "url": "https://t.co/9lsZgIjBbh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/9lsZgIjBbh",
                            "expanded_url": "https://www.platformer.news/",
                            "display_url": "platformer.news",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 121227,
            "friends_count": 863,
            "listed_count": 3404,
            "created_at": "Thu Aug 27 22:37:09 +0000 2009",
            "favourites_count": 216048,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": true,
            "verified": true,
            "statuses_count": 9726,
            "lang": null,
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme14/bg.gif",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme14/bg.gif",
            "profile_background_tile": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/1053792942966497280/BOEYtrXe_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1053792942966497280/BOEYtrXe_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/69426451/1601674745",
            "profile_link_color": "009999",
            "profile_sidebar_border_color": "EEEEEE",
            "profile_sidebar_fill_color": "EFEFEF",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": true,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": true,
        "quoted_status_id": 1380550960095842300,
        "quoted_status_id_str": "1380550960095842306",
        "quoted_status_permalink": {
            "url": "https://t.co/yM7yYKnPbx",
            "expanded": "https://twitter.com/karaswisher/status/1380550960095842306",
            "display": "twitter.com/karaswisher/st…"
        },
        "quoted_status": {
            "created_at": "Fri Apr 09 15:59:32 +0000 2021",
            "id": 1380550960095842300,
            "id_str": "1380550960095842306",
            "full_text": "Tonight at 8:30 pm ET is me &amp; @CaseyNewton doing our weekly jawfest on @TwitterSpaces — this time on privacy &amp; accountability. We’ll talk about my Sway interview with @tim_cook and also news re @YouTube &amp; @Twitch. Guests include @jacknicas @RMac18 &amp; more: https://t.co/sxfxbYo46O",
            "truncated": false,
            "display_text_range": [
                0,
                295
            ],
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [
                    {
                        "screen_name": "CaseyNewton",
                        "name": "Casey Newton",
                        "id": 69426451,
                        "id_str": "69426451",
                        "indices": [
                            34,
                            46
                        ]
                    },
                    {
                        "screen_name": "TwitterSpaces",
                        "name": "Spaces",
                        "id": 1065249714214457300,
                        "id_str": "1065249714214457345",
                        "indices": [
                            75,
                            89
                        ]
                    },
                    {
                        "screen_name": "tim_cook",
                        "name": "Tim Cook",
                        "id": 1636590253,
                        "id_str": "1636590253",
                        "indices": [
                            175,
                            184
                        ]
                    },
                    {
                        "screen_name": "YouTube",
                        "name": "YouTube",
                        "id": 10228272,
                        "id_str": "10228272",
                        "indices": [
                            202,
                            210
                        ]
                    },
                    {
                        "screen_name": "Twitch",
                        "name": "Twitch",
                        "id": 309366491,
                        "id_str": "309366491",
                        "indices": [
                            217,
                            224
                        ]
                    },
                    {
                        "screen_name": "jacknicas",
                        "name": "Jack Nicas",
                        "id": 17892496,
                        "id_str": "17892496",
                        "indices": [
                            241,
                            251
                        ]
                    },
                    {
                        "screen_name": "RMac18",
                        "name": "Ryan Mac🙃",
                        "id": 47191293,
                        "id_str": "47191293",
                        "indices": [
                            252,
                            259
                        ]
                    }
                ],
                "urls": [
                    {
                        "url": "https://t.co/sxfxbYo46O",
                        "expanded_url": "https://www.nytimes.com/2021/04/05/opinion/apples-ceo-is-making-very-different-choices-from-mark-zuckerberg.html?referringSource=articleShare",
                        "display_url": "nytimes.com/2021/04/05/opi…",
                        "indices": [
                            272,
                            295
                        ]
                    }
                ]
            },
            "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 5763262,
                "id_str": "5763262",
                "name": "Kara Swisher",
                "screen_name": "karaswisher",
                "location": "Washington, DC",
                "description": "Chitty-chatter. Subscribe to Sway: https://t.co/WWTJRIz8Yc and to the Pivot podcast: https://t.co/veEHiNbPrd…",
                "url": "https://t.co/DNnvQIgZTB",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/DNnvQIgZTB",
                                "expanded_url": "https://nytimes.com/sway",
                                "display_url": "nytimes.com/sway",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": [
                            {
                                "url": "https://t.co/WWTJRIz8Yc",
                                "expanded_url": "http://podcasts.apple.com/us/podcast/sway/id1528594034",
                                "display_url": "podcasts.apple.com/us/podcast/swa…",
                                "indices": [
                                    35,
                                    58
                                ]
                            },
                            {
                                "url": "https://t.co/veEHiNbPrd",
                                "expanded_url": "http://podcasts.apple.com/us/podcast/piv",
                                "display_url": "podcasts.apple.com/us/podcast/piv",
                                "indices": [
                                    85,
                                    108
                                ]
                            }
                        ]
                    }
                },
                "protected": false,
                "followers_count": 1439118,
                "friends_count": 1915,
                "listed_count": 15871,
                "created_at": "Fri May 04 10:32:22 +0000 2007",
                "favourites_count": 115969,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": true,
                "verified": true,
                "statuses_count": 151506,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "F4FCFC",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_tile": true,
                "profile_image_url": "http://pbs.twimg.com/profile_images/1361540216083935232/angUpfm5_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1361540216083935232/angUpfm5_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/5763262/1599755931",
                "profile_link_color": "01010A",
                "profile_sidebar_border_color": "FFFFFF",
                "profile_sidebar_fill_color": "E0FF92",
                "profile_text_color": "000000",
                "profile_use_background_image": true,
                "has_extended_profile": false,
                "default_profile": false,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 13,
            "favorite_count": 85,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "possibly_sensitive_appealable": false,
            "lang": "en"
        },
        "retweet_count": 1,
        "favorite_count": 90,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    }
  ]

  const tweetList = tweets.map(tweet => <Tweet options={{width: "1000"}} key={tweet.id} tweetId={tweet.id_str}/>)
  


  return (<div>

  {tweetList}


  </div>
  )
}