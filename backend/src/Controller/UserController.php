<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api",name="user_api")
 */
class UserController extends FOSRestController
{
    /**
     * @Rest\Get("/user")
     * 
     * @return Response
     */
    public function readAllUsers(UserRepository $userRepository)
    {
        //get all users from database, return as json
        $users = $userRepository->findAll();
        return $this->handleView($this->view($users));
    }

    /**
     * @Rest\Post("/user")
     * 
     * @return Response
     */
    public function addUser(Request $request, EntityManagerInterface $entityManagerInterface)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $data = json_decode($request->getContent($request), true);
        
        $form->submit($data);

        if($form->isSubmitted() && $form->isValid()){
            $entityManagerInterface->persist($user);
            $entityManagerInterface->flush();
            return $this->handleView($this->view(['status'=>'ok'], Response::HTTP_CREATED));
        }        
        return $this->handleView($this->view($form->getErrors()));
    }


    /**
     * @Rest\Delete("/user/{id}")
     * 
     * @return Response
     */
    public function deleteUser($id, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        $entityManagerInterface->remove($user);
        $entityManagerInterface->flush();
        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_NO_CONTENT));
    }

    /**
     * @Rest\Get("/user/{id}/groups")
     * 
     * @return Response
     */
    public function getUserGroups(int $id, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        $groups = $user->getGroups();

        //below can create problems, refactor after adding some groups
        return $this->handleView($this->view($groups));
    }
}