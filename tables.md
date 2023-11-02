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
[] o usuario pode criar um perfil
[] o usuario pode deletar seu perfil ?
[] o usuario pode logar em seu perfil
[] o usuario pode dar likes em produtos
[] o usuario pode retirar likes de produtos
[] o usuario pode ver a lista de seus produtos com likes

## rotas
post /users
delete /users ?
post /session

(autenticado)
post /likes
delete /likes
get /likes
