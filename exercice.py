def saisie_code():
    while True:
        code_p = input("Entrez un code a bare chiffres : ")
        if len(code_p) == 13 and code_p.isnumeric():
            return code_p
        else:
            print("Le code doit contenir 13 chiffres")
def saisie_nom():
    while True:
        nom_p = input("Entrez le nom du produit : ")
        if len(nom_p) > 0 and nom_p.replace(' ','').isalnum():
            return nom_p
        else:
            print("Le nom doit etre alphanumerique")
def saisie_categorie():
    while True:
        categ_P = input("Entrez la categorie du produit (alimentaire, hygiene, textile, electronique) : ")
        if  categ_P in ["alimentaire", "hygiene", "textile", "electronique"]:
            return categ_P
        else:
            print("Les categories possibles sont : alimentaire, hygiene, textile, electronique")
def saisie_quantite():
    while True:
        Q_P = int(input("Entrez la quantite du produit : "))
        if Q_P > 0:
            return Q_P
        else:
            print("La quantite doit etre superieur a 0")
        

def saisie_prix():
    while True:
        Prix_P = float(input("Entrez le prix du produit : "))
        if (Prix_P > 0):
            return round(Prix_P, 3)
        else:
            print("Le prix doit etre superieur a 0 et valable")

def saisie_stock_GS():
    GS={}
    while True:
        condition=input("Voulez-vous ajouter un produit au stock ? (o/n) : ")
        if condition == "n":
            break
        elif condition == "o":
            code_p = saisie_code()
            nom_p = saisie_nom()
            categ_P = saisie_categorie()
            Q_P = saisie_quantite()
            Prix_P = saisie_prix()
            GS[code_p] = {"nom": nom_p, "categorie": categ_P, "quantite": Q_P, "prix": Prix_P}
        else :
            print("Entrez o ou n")
    return GS
def afficher_GS(GS):
    for code_p in GS:
        print("Code : ", code_p)
        print("Nom : ", GS[code_p]["nom"])
        print("Categorie : ", GS[code_p]["categorie"])
        print("Quantite : ", GS[code_p]["quantite"])
        print("Prix : ", GS[code_p]["prix"])

def filtre_prix(GS, prix_min, prix_max):
    GS_prix = {}
    for code_p in GS:
        if GS[code_p]["prix"] >= prix_min and GS[code_p]["prix"] <= prix_max:
            GS_prix[code_p] = GS[code_p]
    return GS_prix

def main():
    GS = saisie_stock_GS()
    afficher_GS(GS)
    GS_prix=filtre_prix(GS, 10, 20)
    afficher_GS(GS_prix)
main()


        