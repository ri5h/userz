<?php

namespace App\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\ORM\EntityManagerInterface;

use App\Repository\GroupRepository;
use App\Entity\Group;
use App\Form\GroupType;
use App\Repository\UserRepository;

/**
 * @Route("/api",name="group_api")
 */
class GroupController extends FOSRestController
{
    /**
     * @Rest\Get("/group")
     * 
     * @return Response
     */
    public function readAllGroups(GroupRepository $groupRepository)
    {
        //get all users from database, return as json
        $groups = $groupRepository->findBy([], ['id' => 'DESC']);
        return $this->handleView($this->view($groups));
    }

    /**
     * @Rest\Post("/group")
     * 
     * @return Response
     */
    public function addGroup(Request $request, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository)
    {
        $group = new Group();
        $form = $this->createForm(GroupType::class, $group);
        $data = json_decode($request->getContent($request), true);

        //users come in as array of objects, we just care about the ids
        if (count($data["users"]) > 0) {
            foreach ($data["users"] as $user) {
                $group->addUser($userRepository->findOneBy(["id" => $user["id"]]));
            }
            unset($data["users"]);
        }

        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManagerInterface->persist($group);
            $entityManagerInterface->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }
        return $this->handleView($this->view($form->getErrors()));
    }

    /**
     * @Rest\Delete("/group/{id}")
     * 
     * @return Response
     */
    public function deleteGroup($id, EntityManagerInterface $entityManagerInterface, GroupRepository $groupRepository)
    {
        $group = $groupRepository->find($id);
        $entityManagerInterface->remove($group);
        $entityManagerInterface->flush();
        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_NO_CONTENT));
    }
}
