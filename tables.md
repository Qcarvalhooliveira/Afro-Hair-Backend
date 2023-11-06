tablea de usuario precisa ter
campo userID primarykey
campo nome
campo email
campo senha
campo likes foringkey = > likes id


tabela de likes
campo likesID primaryKey
campo user foringKey => userID
campo productLiked

# o que o usuario vai fazer
[v] o usuario pode criar um perfil
[v] o usuario pode deletar seu perfil 
[v] o usuario pode logar em seu perfil
[v] o usuario pode dar likes em produtos
[v] o usuario pode retirar likes de produtos
[v] o usuario pode ver a lista de seus produtos com likes

## rotas
post /users
delete /users (autenticado)
post /session
post /refresh (autenticado)

(autenticado)
post /likes
delete /likes
get /likes
