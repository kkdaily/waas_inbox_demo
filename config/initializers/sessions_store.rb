if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_waas-inbox-demo', domain: ENV['DOMAIN_URL']
else
  Rails.application.config.session_store :cookie_store, key: '_waas-inbox-demo'
end