#First we import all from nada_dsl, the Nada language
from nada_dsl import *
#Next we create function nada_main() - this is the main function that contains our Nada program's code.
def nada_main():

    party1 = Party(name="Party1")

    my_int1 = SecretInteger(Input(name="my_int1", party=party1))

    my_int2 = SecretInteger(Input(name="my_int2", party=party1))

    new_int = my_int1 + my_int2

    return [Output(new_int, "my_output", party1)]